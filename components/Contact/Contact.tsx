import EmailSubmission from "@components/EmailSubmission/EmailSubmissionComponent";
import {MEmail} from "@icons";
import StaticForm from "@components/StaticForms/StaticForms";

interface ContactProps {
	email: string
}

export default function Contact(props: ContactProps) {
	return (<>
		<section id="contact" className="page-section">
			<div className="relative w-full flex justify-center">
				<div className="container grid grid-rows-[] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] lg:justify-items-end gap-12">

					<div className="flex flex-col gap-4 mb-12 relative left-auto right-0 w-fit">
						<h2 className="section-heading text-left">Contact</h2>

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
						<StaticForm />
					</div>
				</div>
			</div>

		</section>
	</>)
}