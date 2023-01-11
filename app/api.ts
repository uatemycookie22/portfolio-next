export async function getContact(): Promise<Contact> {
	let contact: Contact

	try {
		const res = (await import('public/contact.json')).default
		contact = res.contact
	} catch (err) {
		contact = {
			phone: '',
			email: '',
		}
	}

	return contact
}