import {postComment, likeComment, deleteCommentAction} from "../actions";
import {getComments} from "@services/comments-service";
import CommentsList from "@components/CommentsList/CommentsList";

export interface CommentsProps {
	blogId: string
	recipientEmail: string
	adminPassword?: string | null
}

export default async function Comments({ blogId, recipientEmail, adminPassword }: CommentsProps) {
	// Fetch initial batch of top-level comments (depth 0) with pagination
	const result = await getComments({ blogId, depth: 0, limit: 10 });
	
	return (<>
		<section id="comments" className="mt-20">
			<div className="relative w-full justify-center">

				<h2 className="section-heading mr-auto text-left text-black dark:text-white">
					Comments ({result.comments.length}{result.hasMore ? '+' : ''})
				</h2>

				<div className="text-black dark:text-white">
					<CommentsList
						initialComments={result.comments}
						blogId={blogId}
						recipientEmail={recipientEmail}
						hasMore={result.hasMore}
						initialLastKey={result.lastEvaluatedKey}
						likeComment={likeComment}
						postComment={postComment}
						deleteComment={deleteCommentAction}
						adminPassword={adminPassword}
					/>
				</div>

			</div>

		</section>
	</>)
}