'use client';

import {CommonSectionProps} from "../component_props/main-section-props";
import SchoolProgress from "@components/Education/SchoolProgress/SchoolProgress";
import useFirstIntersection from "@hooks/use-first-intersection";
import Image from "next/image";

type EducationProps = Pick<HomeContent, 'education'> & CommonSectionProps


export default function EducationComponents() {
	const [schoolInfoRef, schoolInfoIntersected] = useFirstIntersection({
		threshold: 0.5
	})

	return (<>
		<section id="education">

			<div className="py-12">
				<div className={`container mx-auto px-4 transition-opacity duration-500
										${schoolInfoIntersected ? "opacity-100" : "opacity-0"}
										`}>
					<div>
						<h2 className="text-3xl font-bold text-center text-primary mb-8">Education</h2>
						<div className="flex flex-wrap -mx-4">
							<div className="w-full px-4 mb-0">
								<div className="relative flex flex-col sm:flex-row gap-12 justify-center rounded-lg">
									<Image width={600} height={400} src="/assets/unt.png" alt="University" className="w-full sm:w-1/2 max-w-lg rounded-t-lg" />
									<div className={`p-6 transition-opacity duration-500
										${schoolInfoIntersected ? "opacity-100" : "opacity-0"}
									`}
									     ref={(element) => {
												if (element) schoolInfoRef.current = element}}>
										<h3 className="text-xl font-bold text-primary mb-2">University of North Texas</h3>
										<p className="text-primary mb-4">Expected Graduation: May 2025</p>
										<p className="text-primary mb-4">Major: Computer Science</p>
										<p className="text-primary mb-4">Location: Denton, Texas</p>
										<SchoolProgress />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</section>
	</>)
}