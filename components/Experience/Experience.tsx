import JobCard from "@components/JobCard/JobCard";
import JobContent from "@components/JobContent/JobContent";
import JobBackContent from "@components/JobBackContent/JobBackContent";

type ExperienceProps = { jobs: { front: Parameters<typeof JobContent>[0], back: Parameters<typeof JobBackContent>[0] }[] }

export default function Experience({ jobs }: ExperienceProps) {
	const jobCards = jobs.map((job, i) => (
		<JobCard front={(<JobContent {...job.front} />)} back={(<JobBackContent {...job.back} />)} key={i}/>)
	)

	return (<section id="experience" className="page-section">
		<div className="flex justify-center w-full">
			<div className="container w-[90%]">
				<h2 className="section-heading text-black dark:text-white">Work Experience</h2>
				<div className="grid place-items-center grid-rows-[] grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
					{jobCards}
				</div>
			</div>
		</div>
	</section>)
}