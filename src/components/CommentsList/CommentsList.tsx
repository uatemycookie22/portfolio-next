'use client';
import { useState, useTransition } from 'react';
import CommentBox from '@components/Comment/comment';
import CommentSubmission from '@components/CommentSubmission/comment-submission';
import CommentSkeleton from '@components/CommentSkeleton/CommentSkeleton';
import { ChevronDown } from 'lucide-react';
import { Comment } from '@services/comments-service';

interface CommentsListProps {
    initialComments: Comment[];
    blogId: string;
    recipientEmail: string;
    hasMore: boolean;
    initialLastKey?: Record<string, any>;
    likeComment: (blogId: string, commentSk: string) => Promise<{response?: string, error?: string}>;
    postComment: (blogId: string, formData: FormData, parentId?: string | null, parentDepth?: number, parentSk?: string) => Promise<{response?: string, error?: string}>;
    deleteComment?: (blogId: string, sk: string, adminPassword: string) => Promise<{success?: boolean, error?: string}>;
    adminPassword?: string | null;
}

export default function CommentsList({
    initialComments,
    blogId,
    recipientEmail,
    hasMore: initialHasMore,
    initialLastKey,
    likeComment,
    postComment,
    deleteComment,
    adminPassword
}: CommentsListProps) {
    const [comments, setComments] = useState(initialComments);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [lastKey, setLastKey] = useState(initialLastKey);
    const [isPending, startTransition] = useTransition();
    
    const loadMore = async () => {
        startTransition(async () => {
            try {
                const { loadMoreComments } = await import('../../app/blogs/[...slug]/actions');
                const result = await loadMoreComments(blogId, lastKey);
                
                if (result.comments) {
                    setComments(prev => [...prev, ...result.comments]);
                    setLastKey(result.lastEvaluatedKey);
                    setHasMore(result.hasMore);
                }
            } catch (error) {
                console.error('Error loading more comments:', error);
            }
        });
    };
    
    const handlePostComment = async (blogId: string, formData: FormData) => {
        const result = await postComment(blogId, formData);
        
        if (!result.error) {
            // Optimistically add the new comment to the end (oldest first sorting)
            const text = formData.get('body') as string;
            const authorName = formData.get('authorName') as string;
            
            const optimisticComment: Comment = {
                commentId: 'temp-' + Date.now(),
                blogId,
                sk: `COMMENT#0#${new Date().toISOString()}#temp`,
                depth: 0,
                text: text.trim(),
                authorName: authorName.trim(),
                createdAt: Math.floor(Date.now() / 1000),
                likes: 0,
                parentId: null,
                replyCount: 0
            };
            
            // Add to end since we're sorting oldest first
            setComments(prev => [...prev, optimisticComment]);
        }
        
        return result;
    };
    
    return (
        <>
            <CommentSubmission
                recipientEmail={recipientEmail}
                blogId={blogId}
                postComment={handlePostComment}
            />
            
            {comments.length === 0 ? (
                <div className="text-center py-8 text-neutral dark:text-slate-300">
                    Be the first to comment!
                </div>
            ) : (
                <div className="flex flex-col">
                    {comments.map((comment, index) => (
                        <div key={comment.commentId}>
                            <CommentBox
                                {...comment}
                                replies={[]}
                                likeComment={likeComment}
                                postComment={postComment}
                                deleteComment={deleteComment}
                                adminPassword={adminPassword}
                            />
                            {/* Add divider between comments, but not after the last one */}
                            {index < comments.length - 1 && (
                                <div className="my-4 border-t border-zinc-300 dark:border-zinc-700" />
                            )}
                        </div>
                    ))}
                </div>
            )}
            
            {/* Load more button - Secondary Button */}
            {hasMore && (
                <>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={loadMore}
                            disabled={isPending}
                            className="px-6 py-3 rounded-lg border flex items-center gap-2
                                     border-brand-secondary hover:border-brand-secondary-hover
                                     text-black dark:text-white
                                     hover:text-brand-tertiary dark:hover:text-brand-tertiary
                                     font-medium transition-colors
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Read more comments
                            <ChevronDown fontSize="small" />
                        </button>
                    </div>
                    
                    {/* Show skeleton while loading more comments */}
                    {isPending && (
                        <div className="mt-4">
                            <CommentSkeleton count={3} />
                        </div>
                    )}
                </>
            )}
        </>
    );
}