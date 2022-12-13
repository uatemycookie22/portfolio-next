import '../styles/globals.css'
import {TimelineComponent} from "../components/Timeline/TimelineComponent";

export default function HomePage() {
	return (
		<section>

			<div className="mainDiv">
					<TimelineComponent timelineItems={[
						{label: 'Highschool', text: ''},
						{label: 'College', text: ''},
						{label: 'Future', text: ''},
					]} />
			</div>

		</section>
	)
}