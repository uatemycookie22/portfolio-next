import {CommonSectionProps} from "../component_props/main-section-props";
import TimelineConnectorComponent from "../TimelineConnector/TimelineConnectorComponent";
import colors from "/styles/colors.module.scss";
import EmailSubmission from "../EmailSubmission/EmailSubmissionComponent";
import Hero from "@components/Hero/Hero";

export default function IntroComponent({heading, index, id}: CommonSectionProps) {
	return (<>
		<section id={id}>
			<Hero />

			<TimelineConnectorComponent index={index}>
				<h1  style={{color: colors.mainTextColor}}>{heading}</h1>
			</TimelineConnectorComponent>

			<EmailSubmission />

		</section>
	</>)
}