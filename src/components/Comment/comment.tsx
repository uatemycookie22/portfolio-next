'use client';
import {MPerson} from "../WrappedIcons";
import {toDateString} from "@utils/parse-date";
import {useState, useTransition} from "react";
import CommentSubmission from "../CommentSubmission/comment-submission";
import CommentSkeleton from "../CommentSkeleton/CommentSkeleton";
import {Comment} from "@services/comments-service";

interface CommentBoxProps extends Omit<Comment, 'replies'> {
    likeComment: (blogId: string, commentSk: string) => Promise<{response?: string, error?: string}>;
    postComment: (blogId: string, formData: FormData, parentId?: string | null, parentDepth?: number, parentSk?: string) => Promise<{response?: string, error?: string}>;
    replies?: Comment[];
}

export default function CommentBox(comment: CommentBoxProps) {
    const date = toDateString(new Date(comment.createdAt * 1000).toISOString());
    const [isPending, startTransition] = useTransition();
    const [optimisticLikes, setOptimisticLikes] = useState(comment.likes);
    const [hasLiked, setHasLiked] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [loadedReplies, setLoadedReplies] = useState<Comment[]>([]);
    const [isLoadingReplies, setIsLoadingReplies] = useState(false);
    
    const [triedLoading, setTriedLoading] = useState(false);
    
    const handleShowReplies = async () => {
        if (loadedReplies.length > 0) {
            // Already loaded, just toggle visibility
            setShowReplies(!showReplies);
            return;
        }
        
        // Load from DynamoDB
        setIsLoadingReplies(true);
        const {loadReplies} = await import('../../app/blogs/[...slug]/actions');
        const result = await loadReplies(comment.blogId, comment.commentId, comment.depth);
        
        if (result.replies && result.replies.length > 0) {
            setLoadedReplies(result.replies);
            setShowReplies(true);
        }
        setIsLoadingReplies(false);
    };
    
    const handleLike = () => {
        if (hasLiked) return;  // Prevent multiple likes
        
        // Optimistic update
        setOptimisticLikes(prev => prev + 1);
        setHasLiked(true);
        
        // Server action
        startTransition(async () => {
            const result = await comment.likeComment(comment.blogId, comment.sk);
            if (result.error) {
                // Revert on error
                setOptimisticLikes(comment.likes);
                setHasLiked(false);
            }
        });
    };
    
    return (
        <div className={`mt-8 ${comment.depth > 0 ? 'ml-8 border-l-2 border-zinc-500 pl-4' : ''}`}>
            <div className="rounded-lg shadow-md hover:shadow-lg transition duration-200 text-black dark:text-white
                h-auto p-4 flex flex-col bg-transparent">

                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <MPerson fontSize={'large'} className="inline" />
                        <div className="flex flex-col">
                            <span className="font-semibold">{comment.authorName}</span>
                            <span className="text-xs text-neutral dark:text-slate-300">{date}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-neutral dark:text-slate-300">
                        <button
                            onClick={handleLike}
                            disabled={hasLiked || isPending}
                            className={`hover:text-violet-600 transition-colors ${
                                hasLiked ? 'text-red-500' : ''
                            } ${isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
                            aria-label="Like comment"
                        >
                            {hasLiked ? '❤️' : '🤍'} {optimisticLikes}
                        </button>
                    </div>
                </div>

                <p className="pt-4 whitespace-pre-wrap">
                    {comment.text}
                </p>
                
                {/* Reply button */}
                <div className="mt-2 flex gap-4">
                    <button
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        className="text-xs text-violet-600 dark:text-violet-500 hover:underline"
                    >
                        {showReplyForm ? 'Cancel' : 'Reply'}
                    </button>
                    {comment.replyCount > 0 && (
                        <span className="text-xs text-neutral dark:text-slate-300">
                            {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
                        </span>
                    )}
                </div>
                
                {/* Reply form (shown when Reply clicked) */}
                {showReplyForm && (
                    <div className="mt-4 pl-4 border-l-2 border-violet-500">
                        <CommentSubmission
                            recipientEmail=""
                            blogId={comment.blogId}
                            postComment={async (blogId, formData) => {
                                const result = await comment.postComment(blogId, formData, comment.commentId, comment.depth, comment.sk);
                                if (!result.error) {
                                    setShowReplyForm(false);  // Close form on success
                                    
                                    // Always refresh/load replies after posting
                                    const {loadReplies} = await import('../../app/blogs/[...slug]/actions');
                                    const refreshed = await loadReplies(comment.blogId, comment.commentId, comment.depth);
                                    
                                    if (refreshed.replies && refreshed.replies.length > 0) {
                                        setLoadedReplies(refreshed.replies);
                                        setShowReplies(true);  // Ensure replies are visible
                                    }
                                }
                                return result;
                            }}
                        />
                    </div>
                )}
                
                {/* Show replies button - ONLY if replyCount > 0 */}
                {!showReplies && !isLoadingReplies && comment.replyCount > 0 && (
                    <button
                        onClick={handleShowReplies}
                        className="mt-4 text-xs text-violet-600 dark:text-violet-500 hover:underline"
                    >
                        Show {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
                    </button>
                )}
                
                {/* Show skeleton while loading replies */}
                {isLoadingReplies && (
                    <div className="mt-4">
                        <CommentSkeleton count={Math.min(comment.replyCount, 3)} />
                    </div>
                )}
                
                {/* Render loaded replies */}
                {showReplies && !isLoadingReplies && loadedReplies.length > 0 && (
                    <div className="mt-4">
                        {loadedReplies.map((reply) => (
                            <CommentBox
                                key={reply.commentId}
                                {...reply}
                                replies={[]}
                                likeComment={comment.likeComment}
                                postComment={comment.postComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}