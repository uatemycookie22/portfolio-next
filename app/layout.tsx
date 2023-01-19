/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import Providers from "./main-provider";
import '../public/build/tailwind.css';
import {getContact} from "@api/global";

export default async function RootLayout({ children }: {
	children: ReactNode;
}) {

	const contact = await getContact()

	return (
		<html lang="en" className="scroll-smooth">
		<body className="bg-zinc-900 min-w-[330px]">
		<Providers>
			<header>
				<nav>
					<NavBarComponent contact={contact} />
				</nav>
			</header>

			<main className="pb-32">
				{children}
			</main>

		</Providers>
		</body>
		</html>
	);
}
