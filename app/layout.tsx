/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import Providers from "./main-provider";

async function getContact(): Promise<{ contact: Contact }> {
	const res = await fetch('http://localhost:3000/contact.json')

	return await res.json()
}

export default async function RootLayout({ children }: {
	children: ReactNode;
}) {
	let contact: Contact

	try {
		contact = (await getContact()).contact
	}
	catch (err) {
		console.log(err)
		console.log(`Is the project building?`)
		contact = {
				phone: '',
				email: '',
			}
	}

	return (
		<html lang="en">
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
