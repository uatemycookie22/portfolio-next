import '../styles/globals.css'
import {TimelineComponent} from "../components/Timeline/TimelineComponent";

export default function HomePage() {
	return (
		<>
			<div className="mainDiv">
				<TimelineComponent timelineItems={[{text: 'Highschool Graduation'}]} />
			</div>
		</>
	)
}