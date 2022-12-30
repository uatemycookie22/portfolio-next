/* eslint-disable @next/next/no-head-element */
import {ReactNode} from "react";
import NavBarComponent from "../components/NavBar/NavBarComponent";
import Providers from "./main-provider";

async function getContact(): Promise<Contact> {
	let contact: Contact

	try {
		const res = await fetch('http://localhost:3000/contact.json')
		contact =  (await res.json()).contact
	}
	catch (err) {
		console.log(err)
		console.log(`Is the project building?`)
		contact = {
			phone: '',
			email: '',
		}
	}

	return contact
}

export default async function RootLayout({ children }: {
	children: ReactNode;
}) {

	const contact = await getContact()

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
