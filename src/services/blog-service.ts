import docClient, {BLOG_POSTS_TABLE} from '../lib/dynamodb';
import {GetCommand, QueryCommand, QueryCommandInput} from '@aws-sdk/lib-dynamodb';
import {Blog, BlogListResult} from '../app/blogs/blogs';

/**
 * Get a single blog post by ID
 * Only returns published blogs
 */
export async function getBlog(id: string): Promise<Blog | null> {
    try {
        const command = new GetCommand({
            TableName: BLOG_POSTS_TABLE,
            Key: {id},
        });

        const result = await docClient.send(command);

        if (!result.Item) {
            return null;
        }

        const blog = result.Item as Blog;

        // Only return published blogs
        if (blog.status !== 'published') {
            return null;
        }

        return blog;
    } catch (error) {
        console.error('Error fetching blog from DynamoDB:', error);
        return null;
    }
}

/**
 * List published blogs sorted by published date (newest first)
 * Uses GSI for efficient querying (not scanning!)
 * Supports pagination
 */
export async function listBlogs(options?: {
    limit?: number;
    lastEvaluatedKey?: Record<string, any>;
}): Promise<BlogListResult> {
    try {
        const {limit = 10, lastEvaluatedKey} = options || {};

        // Use Query with StatusDateIndex GSI (FAST - not a scan!)
        // This queries only published blogs, sorted by publishedDate descending
        const queryParams: QueryCommandInput = {
            TableName: BLOG_POSTS_TABLE,
            IndexName: 'StatusDateIndex',
            KeyConditionExpression: '#status = :published',
            ExpressionAttributeNames: {
                '#status': 'status',
            },
            ExpressionAttributeValues: {
                ':published': 'published',
            },
            ScanIndexForward: false, // Sort descending (newest first)
            Limit: limit,
        };

        // Add pagination token if provided
        if (lastEvaluatedKey) {
            queryParams.ExclusiveStartKey = lastEvaluatedKey;
        }

        const command = new QueryCommand(queryParams);
        const result = await docClient.send(command);

        return {
            items: (result.Items || []) as Blog[],
            lastEvaluatedKey: result.LastEvaluatedKey,
            hasMore: !!result.LastEvaluatedKey,
        };
    } catch (error) {
        console.error('Error listing blogs from DynamoDB:', error);
        // Return empty result on error
        return {
            items: [],
            hasMore: false,
        };
    }
}

/**
 * Increment view count for a blog post
 */
export async function incrementBlogViews(id: string): Promise<void> {
    try {
        const {UpdateCommand} = await import('@aws-sdk/lib-dynamodb');
        
        await docClient.send(new UpdateCommand({
            TableName: BLOG_POSTS_TABLE,
            Key: {id},
            UpdateExpression: 'SET #views = if_not_exists(#views, :zero) + :inc',
            ExpressionAttributeNames: {
                '#views': 'views',
            },
            ExpressionAttributeValues: {
                ':zero': 0,
                ':inc': 1,
            },
        }));
    } catch (error) {
        console.error('Error incrementing blog views:', error);
        // Don't throw - view count failure shouldn't break the page
    }
}