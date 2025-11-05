'use client';

import {FormEvent, useCallback, useState} from "react";
import {Alert, Slide, Snackbar} from "@mui/material";
import {MutateOptions, useMutation} from "@tanstack/react-query";
import {SendButton} from "./SendButton";
import {encode} from "../../utils/fetch";
import {TextArea} from "../TextArea/TextArea";
import {TextField} from "../TextField/TextField";
import {invalidPrompt} from "../../utils/api-constants";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

const successMessage = 'Email received.'
const failedEmailPost =  'Email submission failed.'

interface EmailSubmissionProps {
	recipientEmail: string
}

export default function EmailSubmission({recipientEmail}: EmailSubmissionProps) {
	const [emailContact, setEmail] = useState('')
	const [emailMessage, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	const [emailMutation, sendEmail] = useEmail({
		onSuccess: () => {
			setMessage('')
			setStatusMessage(successMessage)
		},

		onError: error => {
			setErrorMessage(error.message)
		}
	})

	return (
		<>

			<form className="flex flex-col gap-y-8 w-full text-whitei"
				  name="contact"
				  method="POST"
				// @ts-ignore
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

				<SendButton isLoading={emailMutation.isPending}/>

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


type ResponseError = [Response | undefined, string]
async function postEmail(body: FormData): Promise<ResponseError> {
	let errorReason = ''

	try {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), 4000);

		const res = await fetch('/api/email', {
			method: 'POST',
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			// headers: {'Content-Type': 'application/json',},
			body: encode({"form-name": 'contact', ...Object.fromEntries(body.entries())}),
			// signal: AbortSignal.timeout(4000)
			signal: controller.signal
		})
		clearTimeout(id)

		if (!res.ok) {
			switch (res.status) {
				case 400: {
					errorReason = invalidPrompt
					break
				}
				default: {
					errorReason = failedEmailPost
					break
				}
			}
		}

		return [res, errorReason]
	} catch (err) {
		if (err instanceof Error) {
			switch (err.name) {
				case 'AbortError': {
					errorReason = 'Email submission timed out.'
					break
				}
				case 'TypeError': {
					errorReason = 'No connection.'
					break
				}
				default: {
					errorReason = failedEmailPost
				}
			}
			console.error(err)
		}

		return [undefined, errorReason]
	}
}


function useEmail(mutateOptions?:  (MutateOptions<ResponseError, Error, FormData>)) {
	const emailMutation = useMutation<ResponseError, Error, FormData>({
		mutationFn: async (form) => {
			const [res, errorMessage] = await postEmail(form)

			if (errorMessage) {
				throw new Error(errorMessage)
			}

			return [res, errorMessage]
		}
	})

	const sendEmail = useCallback( (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault() // Prevent reloading
		emailMutation.mutate(new FormData(e.currentTarget), mutateOptions) // Calls emailMutation()
	}, [emailMutation, mutateOptions])

	return [emailMutation, sendEmail] as const
}