import EmailSubmission from "../EmailSubmission/EmailSubmissionComponent";
import {MDocument, MDownload, MEmail} from "../WrappedIcons";
import StaticForm from "../StaticForms/StaticForms";
import contactjson from "public/contact.json"

export default async function Contact() {
	const { email } = contactjson.contact

	return (<>
		<section id="contact" className="page-section">
			<div className="relative w-full flex justify-center">
				<div className="container grid grid-rows-[] grid-cols-[repeat(auto-fit,minmax(min(340px,90%),1fr))] lg:justify-items-end gap-12">

					<div className="flex flex-col mb-12 relative left-auto right-0 w-fit">
						<h2 className="section-heading text-left text-black dark:text-white">Contact</h2>

						<div className="flex flex-col gap-8">

							<div className="flex flex-col gap-2">

								<h3 className="text-black dark:text-white">
									Want to get in touch? Send me an email!
								</h3>

								<div className="text-black dark:text-white flex gap-2">
									<MEmail />
									<a href={`mailto:${email}`} className="hover:underline">{email}</a>
								</div>

							</div>
							<div className="flex flex-col gap-2">

								<h3 className="text-black dark:text-white">
									Central Time Zone (CST)
								</h3>

								{/*<div className="text-black dark:text-white flex gap-2">*/}
								{/*	<MPhone />*/}
								{/*	<a href={`tel:${phone}`} className="hover:underline">{formattedPhone}</a>*/}
								{/*</div>*/}

							</div>

							<div className="flex flex-col gap-2">
								<div className="text-black dark:text-white flex gap-2">
									<MDocument />
									<a href={`/assets/files/lh-resume.pdf`}
									   target="_blank"
									   className="hover:underline"
									   rel="noreferrer"
									>
										Resume
									</a>
									<a href={`/assets/files/lh-resume.pdf`} aria-label={"Lysander's Resume"} download>
										<MDownload fontSize="small" />
									</a>
								</div>
							</div>
						</div>

					</div>
						<div className="w-full">
							<EmailSubmission recipientEmail={email} />
							<StaticForm />
						</div>


				</div>
			</div>

		</section>
	</>)
}