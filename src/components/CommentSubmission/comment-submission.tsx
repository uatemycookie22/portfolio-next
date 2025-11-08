'use client';
import {TextArea} from "../TextArea/TextArea";
import {TextField} from "../TextField/TextField";
import {SendButton} from "../EmailSubmission/SendButton";
import {Alert, Slide, Snackbar} from "@mui/material";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import { useState } from "react";

const successMessage = 'Comment posted successfully!'


export interface CommentSubmissionProps {
	recipientEmail: string
	blogId: string
	postComment: (blogId: string, formData: FormData, parentId?: string | null, parentDepth?: number) => Promise<{response?: string, error?: string}>
	parentId?: string | null
	parentDepth?: number
}
export default function CommentSubmission({ recipientEmail, blogId, postComment, parentId, parentDepth }: CommentSubmissionProps) {
	const [commentMessage, setMessage] = useState('')
	const [authorName, setAuthorName] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')


	return (<>
			<div className="relative w-full justify-center">

				<form className="flex flex-col gap-y-8 w-full text-whitei"
					  name="comment"
					// @ts-ignore
					  action={async (formData: FormData) => {
					   const {response, error} = await postComment(blogId, formData, parentId, parentDepth)
					   if (error) {
					  setErrorMessage(error)
					   } else {
					   	setStatusMessage(successMessage)
					  // Clear form on success
					  setMessage('')
					  setAuthorName('')
					   }
					  }}
					  onInvalid={() => {
						  setStatusMessage('')
					  }}

				>
					<TextField
						value={authorName}
						onChange={(e) => setAuthorName(e.target.value)}
						id="author-name"
						name="authorName"
						label="Your Name"
						placeholder="John Doe"
						required
						error={!!errorMessage}
						aria-label="Your name"
						type="text"
						maxLength={50}
					/>

					<TextArea value={commentMessage}
							  onChange={(e) => setMessage(e.target.value)}
							  id="outlined-multiline-static"
							  name="body"
							  label="Comment body"
							  placeholder="Share your thoughts..."
							  required
							  error={!!errorMessage}
							  aria-label={'Message text body'}
					/>

					<SendButton isLoading={false}/>

					<Snackbar
						open={!!statusMessage}
						autoHideDuration={6000}
						anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
						TransitionComponent={Slide}
						onClose={() => {
							setStatusMessage('')
						}}
					>

						<Alert
							severity="success"

							onClose={() => {
								setStatusMessage('')
							}}
						>
							{statusMessage}
						</Alert>


					</Snackbar>

					<Snackbar
						open={!!errorMessage}
						autoHideDuration={5000}
						anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
						TransitionComponent={Slide}
						onClose={() => {
							setErrorMessage('')
						}}
					>

						<Alert
							severity="error"

							onClose={() => {
								setErrorMessage('')
							}}
						>
							<ErrorMessage errorMessage={errorMessage} recipientEmail={recipientEmail} />
						</Alert>


					</Snackbar>


				</form>

			</div>

	</>)
}
