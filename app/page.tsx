import '../styles/globals.scss'

import IntroComponent from "@components/Intro/IntroComponent";
import EducationComponents from "@components/Education/EducationComponent";
import Experience from "@components/Experience/Experience";

async function getContent(): Promise<HomeContent> {
	let content: HomeContent

	try {
		const res = (await import('public/content.json')).default
		content = res
	}
	catch (err) {
		console.log(err)
		console.log(`Is the project building?`)
		content = {
			experience: {jobs: []},
			about: {text: ["", "", ""]},
			education: {college: "", graduation: "", location: "", major: "", school: ""},
			intro: {primary: "", secondary: "", facts: []}
		}
	}

	return content
}

export default async function HomePage() {
	const content = await getContent()

	return (
		<>
			<IntroComponent {...content.intro} />
			<EducationComponents {...content.education} />
			<Experience {...content.experience} />
			<div style={{
				position: 'fixed',
				left: 'min(2vw, 100px)',
				zIndex: 2,
			}}>
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

				</div>
			</div>
		</>

	)
}