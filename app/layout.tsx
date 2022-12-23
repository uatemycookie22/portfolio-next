/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import Providers from "./main-provider";
import Head from "next/head";

export default function RootLayout({
	                                   children,
                                   }: {
	children: ReactNode;
}) {
	return (
		<html>
		<Head>
			<title>Lysander Hernandez</title>
			<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
		</Head>
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
