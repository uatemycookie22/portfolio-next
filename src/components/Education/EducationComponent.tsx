'use client';

import SchoolProgress from "./SchoolProgress/SchoolProgress";
import useFirstIntersection from "../../hooks/first-intersection";
import Image from "next/image";
import {MLocation, MMajor} from "../WrappedIcons";
import unt from "@images/unt.png"

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
						<h2 className="section-heading text-black dark:text-white">Education</h2>
						<div className="flex flex-wrap text-slate-800 dark:text-slate-300">
							<div className="w-full mb-0">
								<div className="relative flex flex-col sm:flex-row gap-12 justify-center">
									<Image
										width={600}
										height={400}
										src={unt}
										alt="University"
										className={`w-full h-auto object-fit sm:w-1/2 max-w-lg rounded-t-lg
											${schoolInfoIntersected ? "inline" : "hidden"}
										`}
										quality={65}
									/>
									<div className={`p-6 transition-opacity duration-500
										${schoolInfoIntersected ? "opacity-100" : "opacity-0"}
									`}
									     ref={schoolInfoRef}>

										<h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{school}</h3>

										<ul className="mt-6">
											<li className="flex gap-2">
												<MMajor className="inline" />
												<p className="inline mb-4">
													{major}
												</p>
											</li>

											<li className="flex gap-2">
												<MLocation className=" inline" />
												<p className="mb-4">{location}</p>
											</li>

											<li className="flex flex-col gap-2">
												<SchoolProgress percentage={80} />
												<p className="text-xs self-end">{graduation}</p>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
				</div>
		</section>
	</>)
}