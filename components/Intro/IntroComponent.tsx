import {CommonSectionProps} from "../component_props/main-section-props";
import styles from './IntroComponent.module.scss'
import IntroTypography from "./IntroTypography/IntroTypography";
import TimelineConnectorComponent from "../TimelineConnector/TimelineConnectorComponent";
import colors from "/styles/colors.module.scss";
import Image from "next/image";

export default function IntroComponent({heading, index, id}: CommonSectionProps) {
	return (<>
		<section >
			<div className={styles.headshotContainer}>
				<Image
					alt="" src="/favicon.ico"
					width={100}
					height={100}
				/>
			</div>

			<div>
				<IntroTypography />
			</div>

			<TimelineConnectorComponent index={index}>
				<h1 id={id} style={{color: colors.mainTextColor}}>{heading}</h1>
			</TimelineConnectorComponent>
		</section>
	</>)
}