'use client';

import {FormEvent, useCallback, useState} from "react";
import {Alert, Slide, Snackbar, TextField} from "@mui/material";
import {invalidPrompt} from "./mock-post-email";
import {useMutation} from "react-query";
import {SendButton} from "@components/EmailSubmission/SendButton";
import {encode} from "@utils/fetch";

const emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
const successMessage = 'Email received'

const messageRecords = `http://${process.env.NEXT_PUBLIC_PB_URL}/api/collections/messages/records`
async function postEmail(body: FormData): Promise<[boolean, string]> {
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

		return [res.ok, res.ok ? '' : invalidPrompt]
	} catch (err) {
		console.error('Email submission timed out.')
		console.error(err)
		return [false, 'Email submission failed.']
	}
}

interface EmailSubmissionProps {
	recipientEmail: string
}

export default function EmailSubmission({recipientEmail}: EmailSubmissionProps) {
	const [emailContact, setEmail] = useState('')
	const [emailMessage, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [invalidMessage, setInvalidMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	const mutation = useMutation((form: FormData) => {
		setInvalidMessage('')
		return postEmail(form)
	})

	const sendEmail = useCallback( (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		mutation.mutate(new FormData(e.currentTarget), {
			onSuccess: ([success, errorMessage]) => {
				if (!success) {
					setErrorMessage(errorMessage)
					return
				}

				setMessage('')
				setStatusMessage(successMessage)
			},
		})
	}, [mutation])

	return (
		<>

			<form className="flex flex-col gap-y-8 w-full"
			      name="contact"
			      method="POST"
			      onSubmit={sendEmail}
			      onInvalid={() => {
				      setInvalidMessage(invalidPrompt)
				      setStatusMessage('')
			      }}
			      data-netlify="true"
			>

				<h1 className="text-primary font-semibold">Send me a message</h1>

				<TextField
					required
					id="outlined-required"
					variant="outlined"
					name="address"
					label="Email address"
					autoComplete="email"
					type="email"
					sx={{
						backgroundColor: 'none',
					}}

					inputProps={{
						style: {WebkitBoxShadow: `0 0 0 100px ${'rgb(15,23,42)'} inset`,},
						pattern: emailRegex,
						title: "email@domain.com",
						"data-cy": "user address"
					}}

					value={emailContact}

					onChange={(e) => setEmail(e.target.value)}
				/>

				<TextField
					error={!!invalidMessage}
					required
					multiline
					id="outlined-multiline-static"
					variant="outlined"
					color="secondary"
					name="body"
					label="Email body"
					type="text"
					helperText={invalidMessage}
					rows={12}

					inputProps={{
						minLength: 8,
						maxLength: 1000,
						"data-cy": "message body"
					}}

					value={emailMessage}

					onChange={(e) => setMessage(e.target.value)}
				/>

				<SendButton data-cy="send message" isLoading={mutation.isLoading} />

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
					onClose={ () => {
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

						&nbsp;Please email me directly at <span>
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