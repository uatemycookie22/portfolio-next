import '../styles/globals.css'
import {TimelineComponent} from "../components/Timeline/TimelineComponent";

export default function HomePage() {
	return (
		<>

			<div style={{
				position: 'fixed',
				top: 64,
				left: 'min(2vw, 100px)',
				zIndex: 2,
			}}>

				<TimelineComponent timelineItems={[
					{label: 'How I Started', text: ''},
					{label: 'College', text: ''},
					{label: 'Future', text: ''},
				]} />
			</div>

			<div className="mainDiv"
			     style={{
						gridTemplateAreas: 'none content',
			     }}>
				<div style={{

					gridArea: 'content',
					width: '100vw',
					padding: '10px 0 0 min(5vw, 80px)',
				}}>
					<section>
						<h1>How I Started</h1>
					</section>
					<section>
						<h1>College</h1>
					</section>
				</div>


			</div>
		</>

	)
}