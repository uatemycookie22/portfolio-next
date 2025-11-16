import docClient, {BLOG_POSTS_TABLE} from '../lib/dynamodb';
import {DeleteCommand, GetCommand, PutCommand, QueryCommand, UpdateCommand, QueryCommandInput} from '@aws-sdk/lib-dynamodb';
import {v4 as uuidv4} from 'uuid';

/**
 * Fetch admin password from DynamoDB
 */
export async function getAdminPassword(): Promise<string | null> {
    try {
        const command = new GetCommand({
            TableName: BLOG_POSTS_TABLE,
            Key: {
                id: 'admin-user',
                sk: 'password'
            }
        });

        const result = await docClient.send(command);
        return result.Item?.value as string || null;
    } catch (error) {
        console.error('[getAdminPassword] Error:', error);
        return null;
    }
}

/**
 * Delete a comment (admin only)
 */
export async function deleteComment(blogId: string, sk: string): Promise<boolean> {
    try {
        const command = new DeleteCommand({
            TableName: BLOG_POSTS_TABLE,
            Key: {
                id: blogId,
                sk: sk
            }
        });

        await docClient.send(command);
        
        // Decrement blog post's commentCount
        await docClient.send(new UpdateCommand({
            TableName: BLOG_POSTS_TABLE,
            Key: {
                id: blogId,
                sk: 'METADATA'
            },
            UpdateExpression: 'ADD commentCount :dec',
            ExpressionAttributeValues: {
                ':dec': -1
            }
        }));
        
        console.log('[deleteComment] Deleted comment:', {blogId, sk});
        return true;
    } catch (error) {
        console.error('[deleteComment] Error:', error);
        return false;
    }
}

export interface Comment {
    commentId: string;
    blogId: string;
    sk: string;  // Sort key needed for updates
    depth: number;
    text: string;
    authorName: string;
    createdAt: number;
    likes: number;
    parentId: string | null;
    replyCount: number;
    replies?: Comment[];  // For client-side tree building
}

export interface CommentListResult {
    comments: Comment[];
    lastEvaluatedKey?: Record<string, any>;
    hasMore: boolean;
}

/**
 * Create a new comment or reply
 */
export async function createComment(params: {
    blogId: string;
    text: string;
    authorName: string;
    parentId?: string | null;
    parentDepth?: number;
    parentSk?: string;
}): Promise<Comment> {
    const {blogId, text, authorName, parentId = null, parentDepth, parentSk} = params;
    
    // Calculate depth - parentDepth should be 0 for top-level parent
    const depth = parentId && parentDepth !== undefined ? parentDepth + 1 : 0;
    
    console.log('[createComment] Creating comment with:', {
        parentId,
        parentDepth,
        calculatedDepth: depth
    });
    
    // Generate unique ID and timestamp
    const commentId = uuidv4();
    const createdAt = Math.floor(Date.now() / 1000);  // Unix timestamp
    const timestamp = new Date().toISOString();
    
    // Construct sort key with depth
    const sk = `COMMENT#${depth}#${timestamp}#${commentId}`;
    
    const comment: Comment = {
        commentId,
        blogId,
        sk,
        depth,
        text,
        authorName,
        createdAt,
        likes: 0,
        parentId,
        replyCount: 0
    };
    
    try {
        // Add comment to table
        await docClient.send(new PutCommand({
            TableName: BLOG_POSTS_TABLE,
            Item: {
                id: blogId,
                ...comment
            }
        }));
        
        // Increment blog post's commentCount
        await docClient.send(new UpdateCommand({
            TableName: BLOG_POSTS_TABLE,
            Key: {
                id: blogId,
                sk: 'METADATA'
            },
            UpdateExpression: 'ADD commentCount :inc',
            ExpressionAttributeValues: {
                ':inc': 1
            }
        }));
        
        // If it's a reply, increment parent's replyCount
        if (parentId && parentSk) {
            await incrementReplyCount(blogId, parentSk);
        }
        
        console.log('[createComment] Comment created:', commentId);
        return comment;
    } catch (error) {
        console.error('[createComment] Error creating comment:', error);
        throw new Error('Failed to create comment');
    }
}

/**
 * Get comments for a blog post
 * Optionally filter by depth for progressive loading
 */
export async function getComments(params: {
    blogId: string;
    depth?: number | null;
    limit?: number;
    lastEvaluatedKey?: Record<string, any>;
}): Promise<CommentListResult> {
    const {blogId, depth = null, limit = 100, lastEvaluatedKey} = params;
    
    try {
        // Build sort key prefix based on depth
        const skPrefix = depth !== null ? `COMMENT#${depth}#` : 'COMMENT#';
        
        const queryParams: QueryCommandInput = {
            TableName: BLOG_POSTS_TABLE,
            KeyConditionExpression: 'id = :blogId AND begins_with(sk, :sk)',
            ExpressionAttributeValues: {
                ':blogId': blogId,
                ':sk': skPrefix
            },
            ScanIndexForward: true,  // Oldest first
            Limit: limit
        };
        
        // Add pagination token if provided
        if (lastEvaluatedKey) {
            queryParams.ExclusiveStartKey = lastEvaluatedKey;
        }
        
        console.log('[getComments] Query params:', JSON.stringify(queryParams, null, 2));
        
        const result = await docClient.send(new QueryCommand(queryParams));
        
        const comments = (result.Items || [])
            .filter(item => item.sk.startsWith('COMMENT#'))
            .map(item => ({
                commentId: item.commentId,
                blogId: item.blogId,
                sk: item.sk,
                depth: item.depth,
                text: item.text,
                authorName: item.authorName,
                createdAt: item.createdAt,
                likes: item.likes,
                parentId: item.parentId,
                replyCount: item.replyCount
            })) as Comment[];
        
        console.log('[getComments] Found', comments.length, 'comments');
        
        return {
            comments,
            lastEvaluatedKey: result.LastEvaluatedKey,
            hasMore: !!result.LastEvaluatedKey
        };
    } catch (error) {
        console.error('[getComments] Error fetching comments:', error);
        return {
            comments: [],
            hasMore: false
        };
    }
}

/**
 * Get replies for a specific comment
 */
export async function getReplies(params: {
    blogId: string;
    parentId: string;
    parentDepth: number;
    limit?: number;
}): Promise<Comment[]> {
    const {blogId, parentId, parentDepth, limit = 50} = params;
    
    try {
        // Query for next depth level
        const childDepth = parentDepth + 1;
        
        const result = await docClient.send(new QueryCommand({
            TableName: BLOG_POSTS_TABLE,
            KeyConditionExpression: 'id = :blogId AND begins_with(sk, :sk)',
            FilterExpression: 'parentId = :parentId',
            ExpressionAttributeValues: {
                ':blogId': blogId,
                ':sk': `COMMENT#${childDepth}#`,
                ':parentId': parentId
            },
            ScanIndexForward: true,  // Oldest first
            Limit: limit
        }));
        
        return (result.Items || []).map(item => ({
            commentId: item.commentId,
            blogId: item.blogId,
            sk: item.sk,
            depth: item.depth,
            text: item.text,
            authorName: item.authorName,
            createdAt: item.createdAt,
            likes: item.likes,
            parentId: item.parentId,
            replyCount: item.replyCount
        })) as Comment[];
    } catch (error) {
        console.error('[getReplies] Error fetching replies:', error);
        return [];
    }
}

/**
 * Like a comment (increment likes counter)
 */
export async function likeComment(blogId: string, commentSk: string): Promise<void> {
    try {
        await docClient.send(new UpdateCommand({
            TableName: BLOG_POSTS_TABLE,
            Key: {
                id: blogId,
                sk: commentSk
            },
            UpdateExpression: 'SET likes = if_not_exists(likes, :zero) + :inc',
            ExpressionAttributeValues: {
                ':zero': 0,
                ':inc': 1
            }
        }));
        
        console.log('[likeComment] Comment liked:', commentSk);
    } catch (error) {
        console.error('[likeComment] Error liking comment:', error);
        throw new Error('Failed to like comment');
    }
}

/**
 * Increment reply count for a parent comment
 */
async function incrementReplyCount(blogId: string, parentSk: string): Promise<void> {
    try {
        console.log('[incrementReplyCount] Updating parent SK:', parentSk);
        
        await docClient.send(new UpdateCommand({
            TableName: BLOG_POSTS_TABLE,
            Key: {
                id: blogId,
                sk: parentSk
            },
            UpdateExpression: 'SET replyCount = if_not_exists(replyCount, :zero) + :inc',
            ExpressionAttributeValues: {
                ':zero': 0,
                ':inc': 1
            }
        }));
        
        console.log('[incrementReplyCount] Successfully updated replyCount for', parentSk);
    } catch (error) {
        console.error('[incrementReplyCount] Error incrementing reply count:', error);
        // Don't throw - this is a non-critical update
    }
}

/**
 * Build hierarchical comment tree from flat list
 * O(n) complexity using Map lookup
 */
export function buildCommentTree(comments: Comment[]): Comment[] {
    console.log('[buildCommentTree] Building tree from', comments.length, 'comments');
    console.log('[buildCommentTree] Comment IDs:', comments.map(c => c.commentId));
    console.log('[buildCommentTree] Parent IDs:', comments.map(c => c.parentId));
    
    // Create map for O(1) lookup
    const commentMap = new Map<string, Comment>();
    comments.forEach(comment => {
        commentMap.set(comment.commentId, {...comment, replies: []});
    });
    
    // Build tree
    const roots: Comment[] = [];
    comments.forEach(comment => {
        const node = commentMap.get(comment.commentId)!;
        
        if (comment.parentId) {
            // It's a reply - add to parent's replies array
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                console.log('[buildCommentTree] Attaching reply', comment.commentId, 'to parent', comment.parentId);
                parent.replies!.push(node);
            } else {
                // Orphaned comment (parent not found) - treat as root
                console.warn('[buildCommentTree] Orphaned comment:', comment.commentId, 'parent not found:', comment.parentId);
                roots.push(node);
            }
        } else {
            // Top-level comment
            console.log('[buildCommentTree] Top-level comment:', comment.commentId);
            roots.push(node);
        }
    });
    
    return roots;
}