'use client';

import {FormEvent, useCallback, useState} from "react";
import {Alert, Slide, Snackbar} from "@mui/material";
import {invalidPrompt} from "./mock-post-email";
import {MutateOptions, useMutation} from "react-query";
import {SendButton} from "@components/EmailSubmission/SendButton";
import {encode} from "@utils/fetch";
import {TextArea} from "@components/TextArea/TextArea";
import {TextField} from "@components/TextField/TextField";

const successMessage = 'Email received'
const failedEmailPost =  'Email submission failed.'

type ResponseError = [Response | undefined, string]
async function postEmail(body: FormData): Promise<ResponseError> {
	try {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), 4000);

		const res = await fetch('/', {
			method: 'POST',
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			// headers: {'Content-Type': 'application/json',},
			body: encode({"form-name": 'contact', ...Object.fromEntries(body.entries())}),
			// signal: AbortSignal.timeout(4000)
			signal: controller.signal
		})
		clearTimeout(id)

		let errorReason = ''
		if (!res.ok) {
			switch (res.status) {
				case 500: {
					errorReason = failedEmailPost
					break
				}
				default: {
					errorReason = invalidPrompt
					break
				}
			}
		}

		return [res, errorReason]
	} catch (err) {
		return [undefined, 'Email submission timed out.']
	}
}

interface EmailSubmissionProps {
	recipientEmail: string
}

export default function EmailSubmission({recipientEmail}: EmailSubmissionProps) {
	const [emailContact, setEmail] = useState('')
	const [emailMessage, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	const [emailMutation, sendEmail] = useEmail({
		onSuccess: (res, formData) => {
			console.log(res, formData)
			setMessage('')
			setStatusMessage(successMessage)
		},

		onError: error => {
			console.error(error)
			setErrorMessage(error.message)
		}
	})

	return (
		<>

			<form className="flex flex-col gap-y-8 w-full text-whitei"
				  name="contact"
				  method="POST"
				  onSubmit={sendEmail}
				  onInvalid={() => {
					  setStatusMessage('')
				  }}
				  data-netlify="true"
			>

				<h1 className="text-black dark:text-white font-semibold">Send me a message</h1>

				<TextField value={emailContact}
						   onChange={(e) => setEmail(e.target.value)}
						   required
						   id="outlined-required"
						   name="address"
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

				<SendButton isLoading={emailMutation.isLoading}/>

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
						{errorMessage}

						&nbsp;If the issue persists, please email me directly at <span>
						<a className="text-blue-800 underline" href={`mailto:${recipientEmail}`}>
							{recipientEmail}
						</a>

						</span>
					</Alert>


				</Snackbar>


			</form>

		</>
			)
}

function useEmail(mutateOptions?:  (MutateOptions<ResponseError, Error, FormData>)) {
	const emailMutation = useMutation<ResponseError, Error, FormData>(async (form) => {
		const [_, errorMessage] = await postEmail(form)

		if (errorMessage) {
			throw new Error(errorMessage)
		}

		return postEmail(form)
	})

	const sendEmail = useCallback( (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		emailMutation.mutate(new FormData(e.currentTarget), mutateOptions)
	}, [emailMutation, mutateOptions])

	return [emailMutation, sendEmail] as const
}