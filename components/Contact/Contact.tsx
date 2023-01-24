import EmailSubmission from "@components/EmailSubmission/EmailSubmissionComponent";
import {MDocument, MDownload, MEmail, MPhone} from "@icons";
import StaticForm from "@components/StaticForms/StaticForms";
import {formatPhoneNumber} from "@utils/formatters";
import {getContact} from "@api/global";

export default async function Contact() {
	const { phone, email } = await getContact()
	const formattedPhone = formatPhoneNumber(phone)

	return (<>
		<section id="contact" className="page-section">
			<div className="relative w-full flex justify-center">
				<div className="container grid grid-rows-[] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] lg:justify-items-end gap-12">

					<div className="flex flex-col mb-12 relative left-auto right-0 w-fit">
						<h2 className="section-heading text-left">Contact</h2>

						<div className="flex flex-col gap-8">

							<div className="flex flex-col gap-2">

								<h3 className="text-white">
									Want to get in touch? Send me an email!
								</h3>

								<div className="text-white flex gap-2">
									<MEmail />
									<a href={`mailto:${email}`} className="hover:underline">{email}</a>
								</div>

							</div>
							<div className="flex flex-col gap-2">

								<h3 className="text-white">
									Central Time Zone (CST)
								</h3>

								<div className="text-white flex gap-2">
									<MPhone />
									<a href={`tel:${phone}`} className="hover:underline">{formattedPhone}</a>
								</div>

							</div>

							<div className="flex flex-col gap-2">
								<div className="text-white flex gap-2">
									<MDocument />
									<a href={`https://google.com`}
									   target="_blank"
									   className="hover:underline"
									   rel="noreferrer"
									>
										Resume
									</a>
									<a href={`https://google.com`} download>
										<MDownload fontSize="small" />
									</a>
								</div>
							</div>
						</div>

					</div>
						<div className="w-full min-w-[20rem]">
							<EmailSubmission recipientEmail={email} />
							<StaticForm />
						</div>


				</div>
			</div>

		</section>
	</>)
}