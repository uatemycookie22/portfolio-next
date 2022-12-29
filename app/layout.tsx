/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import Providers from "./main-provider";
import Head from "next/head";

async function getContact(): Promise<{ contact: Contact }> {
	const res = await fetch('http://localhost:3000/contact.json')

	return await res.json()
}

export default async function RootLayout({ children }: {
	children: ReactNode;
}) {
	const { contact } = await getContact()

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
					<NavBarComponent contact={contact} />
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
