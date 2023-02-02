/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import Providers from "./main-provider";
import '../public/build/tailwind.css';
import {getContact} from "@api/global";
import ClientBackground from "@components/ClientBackground/ClientBackground";

export default async function RootLayout({ children }: {
	children: ReactNode;
}) {

	const contact = await getContact()

	return (
		<html lang="en" className="scroll-smooth">
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
