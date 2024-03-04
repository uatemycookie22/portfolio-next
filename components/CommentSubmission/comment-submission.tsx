'use client';
import {TextArea} from "@components/TextArea/TextArea";
import {SendButton} from "@components/EmailSubmission/SendButton";
import {Alert, Slide, Snackbar} from "@mui/material";
import {ErrorMessage} from "@components/ErrorMessage/ErrorMessage";
import { useState } from "react";

const successMessage = 'Comment received.'
const failedCommentPost =  'Comment submission failed.'


export interface CommentSubmissionProps {
	recipientEmail: string
	postComment: (formData: FormData) => Promise<{result?: string, error?: string}>
}
export default function CommentSubmission({ recipientEmail, postComment }: CommentSubmissionProps) {
	const [commentMessage, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')


	return (<>
			<div className="relative w-full justify-center">

				<form className="flex flex-col gap-y-8 w-full text-whitei"
					  name="comment"
					// @ts-ignore
					  action={async (formData: FormData) => {
						  const {result, error} = await postComment(formData)
						  console.log(result, error)
						  if (error) {
							setErrorMessage(error)
						  } else {
						  	setStatusMessage(successMessage)
						  }
					  }}
					  onInvalid={() => {
						  setStatusMessage('')
					  }}

				>

					<TextArea value={commentMessage}
							  onChange={(e) => setMessage(e.target.value)}
							  id="outlined-multiline-static"
							  name="body"
							  label="Comment body"
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
