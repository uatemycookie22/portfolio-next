import '../styles/globals.scss'
import {TimelineComponent} from "../components/Timeline/TimelineComponent";
import IntroComponent from "../components/Intro/IntroComponent";

export default function HomePage() {
	return (
		<>

			<div style={{
				position: 'fixed',
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
					<IntroComponent />
				</div>


			</div>
		</>

	)
}