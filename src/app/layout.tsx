/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "@components/NavBar/NavBarComponent";
import Providers from "./main-provider";
import '../../public/build/tailwind.css';
import '@styles/globals.scss'
import ClientBackground from "@components/ClientBackground/ClientBackground";
import {Metadata} from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export const metadata: Metadata = {
	metadataBase: new URL('https://blog-container-service.vcyrgcw67m07y.us-east-1.cs.amazonlightsail.com'),
	verification: {
		google: 'hnue4ZCbfhcEZk_eqx94YfUfQXiByi1KL-CSkm6Rhu0',
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
	},
	manifest: '/site.webmanifest',
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
		<AppRouterCacheProvider>
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
		</AppRouterCacheProvider>
		</body>
		</html>
	);
}
