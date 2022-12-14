/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import Providers from "./main-provider";

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
		<Providers>
			<header>

				<nav>
					<NavBarComponent/>
				</nav>
			</header>

			<main>
				{children}
			</main>

		</Providers>
		</body>
		</html>
	);
}
