'use client';

import Image from "next/image";
import {MAssignmentInd, MDateRange, MGeopin, MNewTabIcon} from "@icons";

type ImageProps = Parameters<typeof Image>[0]
type TechnologyProps = Pick<ImageProps, 'src' | 'alt'>
const Technology = ({src, alt}: TechnologyProps) => (<>
	<div className="flex flex-col relative group items-center">
		<Image width={35} height={35} src={src} alt={alt}
		       className="object-contain rounded-md w-[35px] h-[35px]"/>

		<span
			className="scale-0 w-auto absolute top-10 min-w-max bg-zinc-500 text-white rounded-lg p-1 group-hover:scale-100 transition-all duration-50 z-50 hover:hidden">
			{alt}
		</span>

	</div>
</>)

interface JobContentProps {
	companyLogo: string
	companyName: string
	companyHref: string
	location: string
	duration: string
	position: string
	technologiesUsed?: TechnologyProps[]
}

export default function JobContent(props: JobContentProps) {
	const technologies = props.technologiesUsed?.map((technologyProps, i) =>
		(<Technology {...technologyProps} key={i}/>))

	return <>
		<div className="h-full w-full grid grid-rows-[1fr_2fr]">

			<div className="ml-auto left-auto right-0 mt-2 mr-2 absolute">
				<a className="text-secondary text-left" href={props.companyHref} target="_blank" rel="noreferrer"
				   aria-label="Company website in new tab"
				   onClick={e => e.stopPropagation()}>
					<MNewTabIcon className="text-secondary text-3xl"/>
				</a>
			</div>

			<div className="bg-center w-full h-full flex justify-center border-b-2 border-gray-200 rounded-t-lg">
				<div className="w-[80%] flex items-center">
					<Image width={1280} height={640} src={props.companyLogo} alt={props.companyName} />
				</div>
			</div>
			<div className="flex flex-col items-start mb-0 relative h-full w-full p-6 dark:bg-neutral overflow-hidden">

				<h3 className="text-xl font-bold text-secondary mb-2">{props.companyName}</h3>
				<li className="flex flex-col items-start justify-start gap-y-4">
					<ul className="flex gap-2 items-center">
						<MGeopin fontSize='small' className="text-black dark:text-violet-600" />
						<p className="text-secondary text-left">{props.location}</p>
					</ul>
					<ul className="flex gap-2 items-center">
						<MDateRange fontSize='small' className="dark:text-violet-600" />
						<p className="text-secondary text-left">{props.duration}</p>
					</ul>
					<ul className="flex gap-2 items-center">
						<MAssignmentInd fontSize='small' className="dark:text-violet-600" />
						<p className="text-secondary text-left">{props.position}</p>
					</ul>
				</li>
				<h3 className={`text-xl font-bold text-secondary mt-4 mb-2
				${props.technologiesUsed ? '' : 'hidden'} 
					`}>
					Technologies used
				</h3>
				<div className="flex flex-wrap gap-x-4 gap-y-2">
					{technologies}
				</div>
			</div>

		</div>
	</>;
}