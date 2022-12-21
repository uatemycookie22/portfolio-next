import '../styles/globals.scss'
import {TimelineComponent} from "../components/Timeline/TimelineComponent";
import IntroComponent from "../components/Intro/IntroComponent";
import EducationComponents from "../components/Education/EducationComponent";

export default function HomePage() {
	const items = [
		{label: 'Test 1', text: '', id: 'top'},
		{label: 'Test 2', text: '', id: 'ibm'},
		{label: 'Test 3', text: '', id: 'tritech'},
	]

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
					width: 'calc(100% - min(5vw, 80px))',
					padding: '10px 0 0 min(5vw, 80px)',
				}}>

					<IntroComponent heading={items[0].label} index={0} id={items[0].id} />

					<EducationComponents heading={items[1].label} index={1} id={items[1].id} />
				</div>
			</div>
		</>

	)
}