'use client';

import styles from "./NavBarComponent.module.scss"
import {AppBar, Button, Link, Toolbar} from "@mui/material";
import {ReactNode} from "react";
import EmailIcon from '@mui/icons-material/Email'
import CallIcon from '@mui/icons-material/Call';

function NavBarButton({children}: {children: ReactNode}) {
	return (
		<Button variant="text" className={styles.linkButton} color="secondary">
			{children}
	</Button>
	)
}

export default function NavBarComponent() {
	return (
		<>
		<AppBar sx={{bgcolor: 'background.default'}}>

			<Toolbar className={styles.navToolbar}>

				<div className={`${styles.iconText} ${styles.email}`}>
					<EmailIcon className={styles.icon} />
					<span className={`${styles.text}`}>
						hernandezlysander22@gmail.com
					</span>

				</div>

				<div className={`${styles.iconText} ${styles.phone}`}>
					<CallIcon className={styles.icon} />
					<a className={`${styles.text}`} href={`tel:+14696553521`}>+1 (469)-655-3521</a>
				</div>

				<div className={styles.linkGroup}>

					<Link href="#top">
						<NavBarButton>
							Top
						</NavBarButton>
					</Link>

					<Link href="#ibm">
						<NavBarButton>
							IBM
						</NavBarButton>
					</Link>

					<Link href="#tritech">
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