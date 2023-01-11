'use client';

import {FormEvent, useCallback, useState} from "react";
import {Alert, Slide, Snackbar, TextField} from "@mui/material";
import colors from "@styles/colors.module.scss";
import {useRouter} from "next/navigation";
import {invalidPrompt} from "./mock-post-email";
import {useMutation} from "react-query";
import {SendButton} from "@components/EmailSubmission/SendButton";

const emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
const successMessage = 'Email received'

async function postEmail(body: FormData): Promise<[boolean, string]> {
	try {
		const res = await fetch(`http://${process.env.NEXT_PUBLIC_PB_URL}/api/collections/messages/records`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json',},
			body: JSON.stringify(Object.fromEntries(body)),
			signal: AbortSignal.timeout(4000)
		})

		return [res.ok, res.ok ? '' : invalidPrompt]
	} catch (err) {
		console.error('Email submission timed out.')
		return [false, 'Email submission failed.']
	}
}

export default function EmailSubmission() {
	const [emailContact, setEmail] = useState('')
	const [emailMessage, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [invalidMessage, setInvalidMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	const mutation = useMutation(postEmail)

	const router = useRouter()

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
				router.refresh()
			},
		})
	}, [mutation, router])

	return (
		<>

			<form className="flex flex-col gap-y-8 w-full"
			      onSubmit={sendEmail}
			      onInvalid={() => {
				      setInvalidMessage(invalidPrompt)
				      setStatusMessage('')
			      }}
			>

				<h1 style={{
					color: colors.mainTextColor
				}}>Send me an email</h1>

				<TextField
					required
					id="outlined-required"
					variant="outlined"
					name="address"
					label="Email address"
					autoComplete="email"

					sx={{
						backgroundColor: 'none',
					}}

					inputProps={{
						style: {WebkitBoxShadow: `0 0 0 100px ${'rgb(15,23,42)'} inset`,},
						pattern: emailRegex,
						title: "email@domain.com",
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
					helperText={invalidMessage}
					rows={12}

					inputProps={{
						minLength: 8,
						maxLength: 1000,
					}}

					value={emailMessage}

					onChange={(e) => setMessage(e.target.value)}
				/>

				<SendButton isLoading={mutation.isLoading} />

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
					<a className="text-blue-800 underline" href="mailto:mail@mail.com">
						mail@mail.mail {/*// TODO: Use real email here*/}
					</a>
				</span>
					</Alert>


				</Snackbar>


			</form>

		</>
			)
}