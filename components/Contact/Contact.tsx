import EmailSubmission from "@components/EmailSubmission/EmailSubmissionComponent";
import {MDocument, MDownload, MEmail, MPhone} from "@icons";
import StaticForm from "@components/StaticForms/StaticForms";
import {useMemo} from "react";
import {formatPhoneNumber} from "@utils/formatters";

interface ContactProps {
	email: string
	phone: string
}

export default function Contact(props: ContactProps) {
	const formattedPhone = useMemo(() => formatPhoneNumber(props.phone), [props.phone])
	return (<>
		<section id="contact" className="page-section">
			<div className="relative w-full flex justify-center">
				<div className="container grid grid-rows-[] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] lg:justify-items-end gap-12">

					<div className="flex flex-col mb-12 relative left-auto right-0 w-fit">
						<h2 className="section-heading text-left">Contact</h2>

						<div className="flex flex-col gap-8">

							<div className="flex flex-col gap-2">

								<h3 className="text-primary">
									Want to get in touch? Send me an email!
								</h3>

								<div className="text-primary flex gap-2">
									<MEmail />
									<a href={`mailto:${props.email}`} className="hover:underline">{props.email}</a>
								</div>

							</div>
							<div className="flex flex-col gap-2">

								<h3 className="text-primary">
									Central Time Zone (CST)
								</h3>

								<div className="text-primary flex gap-2">
									<MPhone />
									<a href={`tel:${props.phone}`} className="hover:underline">{formattedPhone}</a>
								</div>

							</div>

							<div className="flex flex-col gap-2">
								<div className="text-primary flex gap-2">
									<MDocument />
									<a href={`/assets/files/lh-resume.pdf`}
									   target="_blank"
									   className="hover:underline">
										Resume
									</a>
									<a href={`/assets/files/lh-resume.pdf`} download>
										<MDownload fontSize="small" />
									</a>
								</div>
							</div>
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