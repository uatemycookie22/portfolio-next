import TimelineConnectorComponent from "../TimelineConnector/TimelineConnectorComponent";
import {CommonSectionProps} from "../component_props/main-section-props";

export default function IntroComponent({heading, index}: CommonSectionProps) {
	return (<>
		<section>
			<TimelineConnectorComponent index={index}>
				<h1>{heading}</h1>
			</TimelineConnectorComponent>
		</section>
	</>)
}