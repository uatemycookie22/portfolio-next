'use client';

import SchoolProgress from "@components/Education/SchoolProgress/SchoolProgress";
import useFirstIntersection from "@hooks/use-first-intersection";
import Image from "next/image";

interface EducationProps {
	school: string
	graduation: string
	major: string
	location: string
}


export default function EducationComponents({ location, major, school, graduation}: EducationProps) {
	const [schoolInfoRef, schoolInfoIntersected] = useFirstIntersection({
		threshold: 0.5
	})

	return (<>
		<section id="education" className="page-section">
				<div className={`container mx-auto transition-opacity duration-500
										${schoolInfoIntersected ? "opacity-100" : "opacity-0"}
										`}>
						<h2 className="section-heading">Education</h2>
						<div className="flex flex-wrap">
							<div className="w-full mb-0">
								<div className="relative flex flex-col sm:flex-row gap-12 justify-center">
									<Image width={600} height={400} src="/assets/unt.png" alt="University" className="w-full h-auto object-fit sm:w-1/2 max-w-lg rounded-t-lg" />
									<div className={`p-6 transition-opacity duration-500
										${schoolInfoIntersected ? "opacity-100" : "opacity-0"}
									`}
									     ref={(element) => {
												if (element) schoolInfoRef.current = element}}>
										<h3 className="text-xl font-bold text-primary mb-2">{school}</h3>
										<p className="text-primary mb-4">Expected Graduation: {graduation}</p>
										<p className="text-primary mb-4">Major: {major}</p>
										<p className="text-primary mb-4">Location: {location}</p>
										<SchoolProgress />
									</div>
								</div>
							</div>
						</div>
				</div>
		</section>
	</>)
}