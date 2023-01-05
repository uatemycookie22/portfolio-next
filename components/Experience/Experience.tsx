import Image from "next/image";

function JobCard() {
	return <div className="p-8 mb-8 lg:mb-0 transition-all transform hover:scale-105">
		<a className="relative btn" href="https://tritechsoft.com/" target="_blank" rel="noreferrer">
			<div className="bg-secondary pb-4 rounded-lg shadow-2xl drop-shadow-2xl shadow-black grid grid-rows-[0.5fr_0.2fr_0.2fr_0.1fr]">

				<div className="w-full h-[10rem]">
					<Image width={500} height={500} src="/assets/tritech.png" alt="TriTech Software"
					       className="w-full h-full object-contain rounded-t-lg px-8"/>
				</div>
				<h3 className="text-xl font-bold text-secondary ml-6 mt-16">TriTech Software</h3>
				<div className="p-6 grid grid-cols-2 gap-y-2 lg:block">
					<p className="text-secondary">Location: Allen, Texas</p>
					<p className="text-secondary">Duration: May 2022 - Present</p>
					<p className="text-secondary">Position: Programming Intern</p>
					<p className="text-secondary">Description: Changed lives</p>
				</div>

				<h3 className="text-xl font-bold text-secondary ml-6">Technologies used</h3>
				<div className="p-6 flex flex-wrap gap-x-4 gap-y-2">
					<Image width={35} height={35} src="/assets/angular3.png" alt="TriTech Software"
					       className="object-contain rounded-md"/>
					<Image width={35} height={35} src="/assets/ts.png" alt="TriTech Software"
					       className="object-contain rounded-md"/>
					<Image width={35} height={35} src="/assets/rxjs.png" alt="TriTech Software"
					       className="object-contain rounded-md"/>
					<Image width={35} height={35} src="/assets/jest.png" alt="TriTech Software"
					       className="object-contain rounded-md"/>
					<Image width={35} height={35} src="/assets/kotlin.png" alt="TriTech Software"
					       className="object-contain rounded-md"/>
					<Image width={35} height={35} src="/assets/postgresql.png" alt="TriTech Software"
					       className="object-contain rounded-md"/>
					<Image width={35} height={35} src="/assets/graphql.png" alt="TriTech Software"
					       className="object-contain rounded-md"/>
					<Image width={35} height={35} src="/assets/apollo.png" alt="TriTech Software"
					       className="object-contain rounded-md"/>

				</div>
			</div>
		</a>
	</div>;
}

export default function Experience() {
	return (<section id="experience">
		<div className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-primary mb-8">Internships</h2>
				<div className="flex flex-wrap lg:grid lg:grid-cols-2 -mx-4">
					<JobCard/>
					<JobCard/>
				</div>
			</div>
		</div>

	</section>)
}