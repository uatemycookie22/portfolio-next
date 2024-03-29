import CommentSubmission from "@components/CommentSubmission/comment-submission";
import {postComment} from "../actions";
import {commentsApiBase} from "@api-config/comments-api";
import CommentBox from "@components/Comment/comment";

interface Comment {
	text: string
	date: string
}

export interface CommentsProps {
	comments: Comment[]
	recipientEmail: string
}
export default async function Comments({ comments }: CommentsProps) {
	const commentList = await getCommentList().catch(() => [])
	const commentElements = commentList.length > 0
		? commentList.map((comment, i) => (<CommentBox {...comment} key={i} />))
		: 'Be the first to comment!'

	return (<>
		<section id="comments" className="page-section">
			<div className="relative w-full justify-center">

				<h1 className="section-heading mr-auto text-left text-black dark:text-white">
					Comments
				</h1>

				<CommentSubmission recipientEmail={"hernandezlysander22@gmail.com"} postComment={postComment} />

				<div className="py-10 text-black dark:text-white flex-col">
					{commentElements}
				</div>

			</div>

		</section>
	</>)
}

interface CommentListJson {
	data: {id: number, message: string}[]
}
async function getCommentList(): Promise<Comment[]> {
	let errorReason = 'Failed to fetch data'

	try {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), 4000);

		const res = await fetch(`${commentsApiBase}/api/v1/comment`, {
			next: { tags: ['postComment']},
			method: 'GET',
			headers: {'Content-Type': 'application/json',},
			// signal: AbortSignal.timeout(4000)
			signal: controller.signal
		})
		clearTimeout(id)

		const jsonRes: CommentListJson = await res.json()

		return jsonRes.data.map(commentJson => ({
			text: commentJson.message,
			date: ''
		}))
	} catch (err) {
		if (err instanceof Error) {
			switch (err.name) {
				case 'AbortError': {
					errorReason = 'Fetch timed out.'
					break
				}
				case 'TypeError': {
					errorReason = 'No connection.'
					break
				}
				default: {
					errorReason = 'Failed to fetch'
				}
			}
			// console.error(err)
		}

		throw new Error(errorReason)
	}

}