'use client';

import {useCallback, useState} from "react";
import {Alert, Button, Slide, Snackbar, TextField} from "@mui/material";
import colors from "@styles/colors.module.scss";
import {useRouter} from "next/navigation";
import {invalidPrompt, mockPostEmail} from "./mock-post-email";

const emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
const successMessage = 'Email received'

async function postEmail(emailMessage: string, from: string): Promise<[boolean, string]> {
	const res = await fetch(`http://${process.env.NEXT_PUBLIC_PB_URL}/api/collections/messages/records`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json',},
		body: JSON.stringify({
			email: from,
			message: emailMessage,
		}),
	})
		.catch(console.error)

	if (!res) {
		return [false, 'Email submission failed.']
	}

	return [res.ok, res.ok ? '' : invalidPrompt]
}

export default function EmailSubmission() {
	const [emailContact, setEmail] = useState('')
	const [emailMessage, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [invalidMessage, setInvalidMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	const router = useRouter()

	const sendEmail = useCallback(async () => {
		const [success, errorMessage] = await mockPostEmail(emailMessage, emailContact)

		if (!success) {
			setErrorMessage(errorMessage)
			return
		}

		setStatusMessage(successMessage)

		setMessage('')
		router.refresh()
	}, [emailContact, emailMessage, router])

	return (
		<>

		<form className="flex flex-col gap-y-8 w-full"
          onSubmit={async (e) => {
						e.preventDefault()
            await sendEmail()
          }}
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
			label="Email address"
			autoComplete="email"

			sx={{
				backgroundColor: 'none',
			}}

			inputProps={{
				style: {WebkitBoxShadow: `0 0 0 100px ${colors.bgPrimary} inset`,},
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
			name="Email body"
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

		<Button type="submit"  color="secondary" variant="outlined" style={{alignSelf: 'flex-start'}}>
			Send
		</Button>

			<Snackbar
				open={!!statusMessage}
				autoHideDuration={6000}
				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
				TransitionComponent={Slide}
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
				autoHideDuration={6000}
				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
				TransitionComponent={Slide}
			>

				<Alert
					severity="error"

					onClose={() => {
						setErrorMessage('')
					}}
				>
					{errorMessage}
					&nbsp;Please email me directly at <span>
					<a className="text-blue-800 underline" href="mailto:hernandezlysander22@gmail.com">
						hernandezlysander22@gmail.com
					</a>
				</span>
				</Alert>



			</Snackbar>


	</form>

		</>
			)
}