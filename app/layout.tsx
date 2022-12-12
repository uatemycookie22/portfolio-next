/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import {MainThemeProvider} from "./theme-provider";

export default function RootLayout({
	                                   children,
                                   }: {
	children: ReactNode;
}) {
	return (
		<html>
		<head>
			<title>Lysander Hernandez</title>
		</head>
		<body>
		<MainThemeProvider>
			<header>

				<nav>
					<NavBarComponent/>
				</nav>
			</header>

			<main>
				{children}
			</main>

		</MainThemeProvider>
		</body>
		</html>
	);
}
