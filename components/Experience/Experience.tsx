import {JobCard} from "@components/JobCard/JobCard";
import {JobContent} from "@components/JobContent/JobContent";
import {ReactNode} from "react";


function JobBullet({ children }: { children: ReactNode }) {
	return <li className="border-b border-gray-300 p-6 py-2">
		<p className="text-lg font-semibold text-left text-secondary">
			{children}
		</p>
	</li>;
}

interface JobBackContentProps {
	items?: string[];
}

function JobBackContent(props: JobBackContentProps) {
	const bullets = props.items?.map((text, i) => (
		<JobBullet key={i}>
			{text}
		</JobBullet>))

	return <>


		<ul className="h-full w-full pb-4">
			{bullets}
		</ul>


	</>;
}

export default function Experience() {
	const tritechJob =
		<JobContent companyName={'TriTech Software'}
		            companyLogo={'/assets/tritech.png'}
		            location={'Allen, Texas'}
		            duration={'Pr'}
		            position={'Intern'}
		            key={0}
		            technologiesUsed={[
			            {src: '/assets/angular3.png', alt: 'Angular'},
			            {src: '/assets/ts.png', alt: 'TypeScript'},
			            {src: '/assets/rxjs.png', alt: 'RxJs'},
			            {src: '/assets/jest.png', alt: 'Jest'},
			            {src: '/assets/kotlin.png', alt: 'Kotlin'},
			            {src: '/assets/postgresql.png', alt: 'PostgresSQL'},
			            {src: '/assets/graphql.png', alt: 'GraphQL'},
			            {src: '/assets/docker.png', alt: 'Docker'},
			            {src: '/assets/sass.png', alt: 'SCSS'},
		            ]}

		/>

	const tritechBackContent = (<JobBackContent
		items={[' Contributed 15-35% of the progress each sprint assigned to a team of 7 using Scrum methodology ']}/>)

	const ibmJob =
		<JobContent companyName={'IBM'}
		            companyLogo={'/assets/ibm.png'}
		            location={'Copell, Texas'}
		            duration={'1'}
		            position={'Intern'}
		            key={1}
		            technologiesUsed={[
			            {src: '/assets/html.png', alt: 'HTML5'},
			            {src: '/assets/js.png', alt: 'JavaScript'},
			            {src: '/assets/python.png', alt: 'Python'},
			            {src: '/assets/ubuntu.png', alt: 'Ubuntu'},
			            {src: '/assets/docker.png', alt: 'Docker'},
		            ]}
		/>

	const ibmBackContent = (<JobBackContent
		items={[' Contributed 15-35% of the progress each sprint assigned to a team of 7 using Scrum methodology ']}/>)



	return (<section id="experience">

		<div className="py-20">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-primary mb-8">Work Experience</h2>
				<div className="grid place-items-center grid-rows-[] grid-cols-[repeat(auto-fit,minmax(350px,1fr))] -mx-4">
					<JobCard front={tritechJob} back={tritechBackContent}/>
					<JobCard front={ibmJob} back={ibmBackContent}/>
				</div>
			</div>
		</div>

	</section>)
}