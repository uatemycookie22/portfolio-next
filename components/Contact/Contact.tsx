import EmailSubmission from "@components/EmailSubmission/EmailSubmissionComponent";

interface ContactProps {
	email: string
}

export default function Contact(props: ContactProps) {
	return (<>
		<section id="contact">
			<h2 className="text-3xl font-bold text-center text-primary mb-8 py-12">Contact</h2>

			<div className="relative w-full flex justify-center">
				<div className="container flex justify-center">
					<div className="w-[50%] min-w-[20rem]">
						<EmailSubmission recipientEmail={props.email} />
					</div>
				</div>
			</div>

		</section>
	</>)
}