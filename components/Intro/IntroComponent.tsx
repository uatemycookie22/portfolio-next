import {CommonSectionProps} from "../component_props/main-section-props";
import styles from './IntroComponent.module.scss'
import IntroTypography from "./IntroTypography/IntroTypography";
import TimelineConnectorComponent from "../TimelineConnector/TimelineConnectorComponent";
import colors from "/styles/colors.module.scss";
import Image from "next/image";
import EmailSubmission from "../EmailSubmission/EmailSubmissionComponent";

export default function IntroComponent({heading, index, id}: CommonSectionProps) {
	return (<>
		<section id={id}>
			<div className={styles.headshotContainer}>
				<Image
					alt="" src="/assets/js.png"
					width={100}
					height={100}
				/>
			</div>

			<div>
				<IntroTypography />
			</div>

			<TimelineConnectorComponent index={index}>
				<h1  style={{color: colors.mainTextColor}}>{heading}</h1>
			</TimelineConnectorComponent>

			<EmailSubmission />

		</section>
	</>)
}