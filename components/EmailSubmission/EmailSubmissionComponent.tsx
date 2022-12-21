'use client';

import {useCallback, useState} from "react";
import {Button, TextField} from "@mui/material";
import colors from "/styles/colors.module.scss";

export default function EmailSubmission() {
	const [emailContact, setEmail] = useState('')
	const [emailMessage, setMessage] = useState('')

	const sendEmail = useCallback(async () => {
		await fetch('http://127.0.0.1:8090/api/collections/messages/records', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',},
			body: JSON.stringify({
				email: emailContact,
				message: emailMessage,
			}),
		})


	}, [emailContact, emailMessage])

	return (<form style={{display: 'flex', flexDirection: 'column', gap: '25px', maxWidth: '500px' }  } onSubmit={() => sendEmail()}>

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

			inputProps={{ style: {WebkitBoxShadow: `0 0 0 100px ${colors.bgPrimary} inset`}}}

			onBlur={(e) => setEmail(e.target.value)}
		/>

		<TextField
			id="outlined-multiline-static"
			color="secondary"
			label="Email body"
			multiline
			rows={12}
			onBlur={(e) => setMessage(e.target.value)}
		/>

		<Button type="submit"  color="secondary" variant="outlined" style={{alignSelf: 'flex-start'}}

		>
			Send</Button>

	</form>)
}