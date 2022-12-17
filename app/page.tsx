import '../styles/globals.scss'
import {TimelineComponent} from "../components/Timeline/TimelineComponent";
import IntroComponent from "../components/Intro/IntroComponent";

export default function HomePage() {
	const items = [
		{label: 'Test 1', text: '', id: 'top'},
		{label: 'Test 2', text: '', id: 'ibm'},
		{label: 'Test 3', text: '', id: 'tritech'},
	]

	const sections = items.map((item, i) =>
		<IntroComponent heading={item.label} key={i} index={i} id={item.id} />)

	return (
		<>

			<div style={{
				position: 'fixed',
				left: 'min(2vw, 100px)',
				zIndex: 2,
			}}>

				<TimelineComponent timelineItems={items} />
			</div>

			<div className="mainDiv"
			     style={{
						gridTemplateAreas: 'none content',
			     }}>
				<div style={{

					gridArea: 'content',
					width: '70vw',
					padding: '10px 0 0 min(5vw, 80px)',
				}}>

					{sections}

				</div>
			</div>
		</>

	)
}