import JobCard from "@components/JobCard/JobCard";
import JobContent from "@components/JobContent/JobContent";
import JobBackContent from "@components/JobBackContent/JobBackContent";

type ExperienceProps = { jobs: { front: Parameters<typeof JobContent>[0], back: Parameters<typeof JobBackContent>[0] }[] }

export default function Experience({ jobs }: ExperienceProps) {
	const jobCards = jobs.map((job, i) => (
		<JobCard front={(<JobContent {...job.front} />)} back={(<JobBackContent {...job.back} />)} key={i}/>)
	)

	return (<section id="experience">

		<div className="py-20">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-primary mb-8">Work Experience</h2>
				<div className="grid place-items-center grid-rows-[] grid-cols-[repeat(auto-fit,minmax(350px,1fr))] -mx-4">
					{jobCards}
				</div>
			</div>
		</div>

	</section>)
}