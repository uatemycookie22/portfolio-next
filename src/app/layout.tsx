/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "@components/NavBar/NavBarComponent";
import Providers from "./main-provider";
import '../../public/build/tailwind.css';
import '@styles/globals.scss'
import ClientBackground from "@components/ClientBackground/ClientBackground";
import {Metadata} from "next";

export const metadata: Metadata = {
	metadataBase: new URL('https://blog-container-service.vcyrgcw67m07y.us-east-1.cs.amazonlightsail.com'),
}

import contactjson from "public/contact.json"

export default async function RootLayout({ children }: {
	children: ReactNode;
}) {
	const { contact } = contactjson

	return (
		<html lang="en"
			  className="scroll-smooth bg-zinc-200 dark">
		<body className="bg-transparent min-w-[330px]">
		<Providers>
			<ClientBackground>
				<header>
					<nav>
						<NavBarComponent contact={contact} />
					</nav>
				</header>

				<main>
					{children}
				</main>
			</ClientBackground>

		</Providers>
		</body>
		</html>
	);
}
