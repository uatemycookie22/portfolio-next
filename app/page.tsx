import '../styles/globals.scss'

import IntroComponent from "@components/Intro/IntroComponent";
import EducationComponents from "@components/Education/EducationComponent";
import AboutComponent from "@components/About/AboutComponent";
import TimelineComponent from "@components/Timeline/TimelineComponent";

async function getContent(): Promise<HomeContent> {
	const res = await fetch('http://localhost:3000/content.json')

	return await res.json()
}

export default async function HomePage() {
	const items = [
		{label: 'Test 1', text: '', id: 'top'},
		{label: 'Test 2', text: '', id: 'ibm'},
		{label: 'Test 3', text: '', id: 'tritech'},
	]
	const content = await getContent()

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

					<AboutComponent text={['', '', '']} />

					<EducationComponents education={content.education} heading={items[1].label} index={1} id={items[1].id } />
				</div>
			</div>
		</>

	)
}