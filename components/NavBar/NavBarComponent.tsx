'use client';

import styles from "./NavBarComponent.module.scss"
import {AppBar, Button, Link, Toolbar} from "@mui/material";

export default function NavBarComponent() {
	return (
		<AppBar sx={{bgcolor: 'background.default'}}>

			<Toolbar className={styles.navToolbar}>

				<Link href="#top">
					<Button variant="text" className={styles.linkButton} color="secondary">
						Top
					</Button>
				</Link>

				<Link href="#ibm">
					<Button variant="text" className={styles.linkButton} color="secondary">
						IBM
					</Button>
				</Link>

				<Link href="#tritech">
					<Button variant="text" className={styles.linkButton} color="secondary">
						TriTech
					</Button>
				</Link>

			</Toolbar>

		</AppBar>
	)
}