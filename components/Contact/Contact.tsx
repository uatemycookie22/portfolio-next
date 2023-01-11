import EmailSubmission from "@components/EmailSubmission/EmailSubmissionComponent";
import {MEmail} from "@icons";

interface ContactProps {
	email: string
}

export default function Contact(props: ContactProps) {
	return (<>
		<section id="contact">
			<h2 className="text-3xl font-bold text-center text-primary mb-8">Contact</h2>

			<div className="relative w-full flex justify-center">
				<div className="container p-4 grid grid-rows-[] grid-cols-[repeat(auto-fit,minmax(350px,1fr))] -mx-4 justify-items-center">

					<div className="flex flex-col gap-4 mb-12 relative left-auto right-0">
						<h3 className="text-primary">
							Want to get in touch? Send me an email!
						</h3>

						<div className="text-primary flex gap-2">
							<MEmail />
							<span>{props.email}</span>
						</div>
					</div>


					<div className="w-full min-w-[20rem]">
						<EmailSubmission recipientEmail={props.email} />
					</div>
				</div>
			</div>

		</section>
	</>)
}