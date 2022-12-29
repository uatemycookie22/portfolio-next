'use client';

import styles from "./NavBarComponent.module.scss"
import {AppBar, Button, Link, Toolbar} from "@mui/material";
import {ReactNode, useMemo} from "react";
import EmailIcon from '@mui/icons-material/Email'
import CallIcon from '@mui/icons-material/Call';
import colors from "@styles/colors.module.scss"
import {formatPhoneNumber} from "@utils/formatters";

function NavBarButton({children}: {children: ReactNode}) {
	return (
		<Button variant="text" className={styles.linkButton} color="secondary">
			{children}
	</Button>
	)
}

type NavbarProps = {
	contact: Contact
}

export default function NavBarComponent(props: NavbarProps) {
	const { phone, email } = props.contact

	const phoneFormatted = useMemo(() => formatPhoneNumber(phone), [phone])

	return (
		<>
		<AppBar sx={{bgcolor: 'background.default'}}>

			<Toolbar className={styles.navToolbar}>

				<a style={{color: colors.navTextColor}} href={`mailto:${email}`}>

					<Button
						variant="text"
						color="secondary"
						size="medium"
						className={`${styles.iconText} ${styles.email}`}
						startIcon={<EmailIcon />}>
					<span>
						{email}
					</span>

					</Button>

				</a>

				<a style={{color: colors.navTextColor}} href={`tel:${phone}`}>

					<Button
						variant="text"
						color="secondary"
						size="medium"
						className={`${styles.iconText} ${styles.phone}`}
						startIcon={<CallIcon />}>
						{phoneFormatted}
					</Button>

				</a>

				<div className={styles.linkGroup}>

					<Link href={"#top"}>
						<NavBarButton>
							Top
						</NavBarButton>
					</Link>

					<Link href={"#ibm"}>
						<NavBarButton>
							IBM
						</NavBarButton>
					</Link>

					<Link href={"#tritech"}>
						<NavBarButton>
							TriTech
						</NavBarButton>
					</Link>

				</div>

			</Toolbar>

		</AppBar>
		<Toolbar sx={{background: 'rgb(0,0,0,0)'}} />
		</>
	)
}