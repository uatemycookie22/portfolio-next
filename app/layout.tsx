/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import Providers from "./main-provider";
import '../public/build/tailwind.css';
import {getContact} from "./api";

export default async function RootLayout({ children }: {
	children: ReactNode;
}) {

	const contact = await getContact()

	return (
		<html lang="en" className="scroll-smooth">
		<body className="bg-primary min-w-[330px]">
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
