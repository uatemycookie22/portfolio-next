'use client';

import styles from "./NavBarComponent.module.scss"
import {AppBar, Button, Link, ThemeProvider, Toolbar} from "@mui/material";
import {mainTheme} from "../../themes/main-theme";

export default function NavBarComponent() {
	return (
		<AppBar>

			<Toolbar className={styles.navToolbar}>


				<ThemeProvider theme={mainTheme}>
					<Link href="#top">
						<Button variant="text" className={styles.linkButton}  color="secondary">
							Top
						</Button>
					</Link>

					<Link href="#ibm">
						<Button variant="text" className={styles.linkButton}  color="secondary">
							IBM
						</Button>
					</Link>

					<Link href="#tritech">
						<Button variant="text" className={styles.linkButton}  color="secondary">
							TriTech
						</Button>
					</Link>
				</ThemeProvider>





			</Toolbar>

		</AppBar>
	)
}