'use client';

import {useCallback, useState} from "react";
import {Alert, Button, Slide, Snackbar, TextField} from "@mui/material";
import colors from "/styles/colors.module.scss";
import {useRouter} from "next/navigation";

const emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
const bodyErrorMessage = 'Must be at least 8 characters.'
const successMessage = 'Email received'

export default function EmailSubmission() {
	const [emailContact, setEmail] = useState('')
	const [emailMessage, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	const router = useRouter()

	const sendEmail = useCallback(async () => {
		const res = await fetch('http://127.0.0.1:8090/api/collections/messages/records', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',},
			body: JSON.stringify({
				email: emailContact,
				message: emailMessage,
			}),
		})

		const newErrorMessage = res.ok ? '' : bodyErrorMessage
		setErrorMessage(newErrorMessage)

		const newStatusMessage = res.ok ? successMessage : ''
		setStatusMessage(newStatusMessage)

		setMessage('')
		router.refresh()
	}, [emailContact, emailMessage, router])

	return (
		<>

		<form style={{display: 'flex', flexDirection: 'column', gap: '25px', maxWidth: '500px' }  }
          onSubmit={async (e) => {
						e.preventDefault()
            await sendEmail()
          }}
					onInvalid={() => {
						setErrorMessage(bodyErrorMessage)
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
			color="secondary"

			inputProps={{
				style: {WebkitBoxShadow: `0 0 0 100px ${colors.bgPrimary} inset`,},
				pattern: emailRegex,
				title: "email@domain.com",
			}}

			value={emailContact}

			onChange={(e) => setEmail(e.target.value)}
		/>

		<TextField
			error={!!errorMessage}
			required
			multiline
			id="outlined-multiline-static"
			variant="outlined"
			color="secondary"
			name="Email body"
			label="Email body"
			helperText={errorMessage}
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


	</form>

		</>
			)
}