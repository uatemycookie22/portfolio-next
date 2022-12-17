import TimelineConnectorComponent from "../TimelineConnector/TimelineConnectorComponent";
import {CommonSectionProps} from "../component_props/main-section-props";
import colors from '/styles/colors.module.scss'

export default function IntroComponent({heading, index, id}: CommonSectionProps) {
	return (<>
		<section >
			<TimelineConnectorComponent index={index}>
				<h1 id={id} style={{color: colors.mainTextColor}}>{heading}</h1>
			</TimelineConnectorComponent>
		</section>
	</>)
}