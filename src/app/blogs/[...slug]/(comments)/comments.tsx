import CommentSubmission from "@components/CommentSubmission/comment-submission";
import {postComment, likeComment} from "../actions";
import {getComments, buildCommentTree} from "@services/comments-service";
import CommentBox from "@components/Comment/comment";

export interface CommentsProps {
	blogId: string
	recipientEmail: string
}

export default async function Comments({ blogId, recipientEmail }: CommentsProps) {
	// Only fetch top-level comments (depth 0) initially
	const result = await getComments({ blogId, depth: 0, limit: 100 });
	
	const commentElements = result.comments.length > 0
		? result.comments.map((comment) => (
			<CommentBox
				{...comment}
				replies={[]}  // No pre-loaded replies, load on-demand
				key={comment.commentId}
				likeComment={likeComment}
				postComment={postComment}
			/>
		))
		: 'Be the first to comment!';

	return (<>
		<section id="comments" className="page-section">
			<div className="relative w-full justify-center">

				<h1 className="section-heading mr-auto text-left text-black dark:text-white">
					Comments ({result.comments.length})
				</h1>

				<CommentSubmission
					recipientEmail={recipientEmail}
					blogId={blogId}
					postComment={postComment}
				/>

				<div className="py-10 text-black dark:text-white flex-col">
					{commentElements}
				</div>

			</div>

		</section>
	</>)
}