'use client';

import {useState, useActionState, useEffect} from "react";
import {Alert, Slide, Snackbar} from "@mui/material";
import {SendButton} from "./SendButton";
import {TextArea} from "../TextArea/TextArea";
import {TextField} from "../TextField/TextField";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {sendEmailToOwner} from "src/app/actions";

const successMessage = 'Email received.'

interface EmailSubmissionProps {
	recipientEmail: string
}

export default function EmailSubmission({recipientEmail}: EmailSubmissionProps) {
	const [emailContact, setEmail] = useState('')
	const [emailMessage, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')
	
	const [state, formAction, isPending] = useActionState<{response?: string, error?: string} | null, FormData>(
		sendEmailToOwner,
		null
	)
	
	// Handle server action response
	useEffect(() => {
		if (state?.response) {
			setMessage('')
			setEmail('')
			setStatusMessage(successMessage)
			setErrorMessage('')
		}
		if (state?.error) {
			setErrorMessage(state.error)
			setStatusMessage('')
		}
	}, [state])

	return (
		<>

			<form className="flex flex-col gap-y-8 w-full text-whitei"
				  name="contact"
				  action={formAction}
				  onInvalid={() => {
					  setStatusMessage('')
				  }}
			>

				<h1 className="text-black dark:text-white font-semibold">Send me a message</h1>

				<TextField value={emailContact}
						   onChange={(e) => setEmail(e.target.value)}
						   required
						   id="outlined-required"
						   name="email"
						   label="Email address"
						   type="email"
						   autoComplete="email"
						   error={!!errorMessage}
						   aria-label={'Email address'}
				/>



				<TextArea value={emailMessage}
						   onChange={(e) => setMessage(e.target.value)}
						   id="outlined-multiline-static"
						   name="body"
						   label="Email body"
						   required
						   error={!!errorMessage}
						  aria-label={'Message text body'}
				/>

				<SendButton isLoading={isPending}/>

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

		</>
			)
}

