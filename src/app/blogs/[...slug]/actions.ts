'use server';

import {invalidPrompt} from "@utils/api-constants";
import {revalidatePath, revalidateTag, updateTag} from "next/cache";
import {
    createComment,
    deleteComment as deleteCommentService,
    getAdminPassword,
    likeComment as likeCommentService
} from "@services/comments-service";

export async function postComment(
    blogId: string,
    formData: FormData,
    parentId?: string | null,
    parentDepth?: number,
    parentSk?: string
): Promise<{response?: string, error?: string}> {
    const text = formData.get('body') as string;
    const authorName = formData.get('authorName') as string;

    // Validation
    if (!text || text.trim().length === 0) {
        return {error: 'Comment text is required'};
    }
    
    if (!authorName || authorName.trim().length === 0) {
        return {error: 'Author name is required'};
    }

    if (text.length > 1000) {
        return {error: 'Comment is too long (max 1000 characters)'};
    }

    try {
        await createComment({
            blogId,
            text: text.trim(),
            authorName: authorName.trim(),
            parentId: parentId || null,
            parentDepth: parentDepth ?? -1,
            parentSk: parentSk
        });

        // Revalidate the blog page to show new comment
        revalidateTag(`comments-${blogId}`, {});

        return {response: 'Comment posted successfully', error: undefined};
    } catch (err) {
        console.error('[postComment] Error:', err);
        return {response: undefined, error: 'Failed to post comment'};
    }
}

export async function deleteCommentAction(
    blogId: string,
    sk: string,
    adminPassword: string
): Promise<{success?: boolean, error?: string}> {
    try {
        // Fetch actual password from DynamoDB
        const actualPassword = await getAdminPassword();
        
        if (!actualPassword) {
            return {error: 'Admin authentication not configured'};
        }
        
        // Validate password
        if (adminPassword !== actualPassword) {
            return {error: 'Invalid admin password'};
        }
        
        // Delete comment
        const deleted = await deleteCommentService(blogId, sk);
        
        if (!deleted) {
            return {error: 'Failed to delete comment'};
        }
        
        // Revalidate comments cache to show deletion
        updateTag(`comments-${blogId}`)
        
        return {success: true};
    } catch (error) {
        console.error('[deleteCommentAction] Error:', error);
        return {error: 'Failed to delete comment'};
    }
}

export async function likeComment(
    blogId: string,
    commentSk: string
): Promise<{response?: string, error?: string}> {
    try {
        await likeCommentService(blogId, commentSk);
        
        // Revalidate to show updated like count
        revalidatePath(`/blogs/${blogId}`);
        
        return {response: 'Comment liked!', error: undefined};
    } catch (err) {
        console.error('[likeComment] Error:', err);
        return {response: undefined, error: 'Failed to like comment'};
    }
}

export async function loadReplies(
    blogId: string,
    parentId: string,
    parentDepth: number
): Promise<{replies?: any[], error?: string}> {
    try {
        const {getReplies} = await import('@services/comments-service');
        const replies = await getReplies({
            blogId,
            parentId,
            parentDepth,
            limit: 50
        });
        
        return {replies, error: undefined};
    } catch (err) {
        console.error('[loadReplies] Error:', err);
        return {replies: undefined, error: 'Failed to load replies'};
    }
}

export async function loadMoreComments(
    blogId: string,
    lastEvaluatedKey?: Record<string, any>
): Promise<{comments: any[], lastEvaluatedKey?: Record<string, any>, hasMore: boolean}> {
    try {
        const {getComments} = await import('@services/comments-service');
        const result = await getComments({
            blogId,
            depth: 0,
            limit: 10,
            lastEvaluatedKey
        });
        
        return {
            comments: result.comments,
            lastEvaluatedKey: result.lastEvaluatedKey,
            hasMore: result.hasMore
        };
    } catch (err) {
        console.error('[loadMoreComments] Error:', err);
        return {comments: [], hasMore: false};
    }
}

