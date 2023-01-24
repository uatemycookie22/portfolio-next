'use client';

import Image from "next/image";
import {MNewTabIcon} from "@icons";

type ImageProps = Parameters<typeof Image>[0]
type TechnologyProps = Pick<ImageProps, 'src' | 'alt'>
const Technology = ({src, alt}: TechnologyProps) => (<>
	<div className="flex flex-col relative group items-center">
		<Image width={35} height={35} src={src} alt={alt}
		       className="object-contain rounded-md w-[35px] h-[35px]"/>

		<span
			className="scale-0 w-auto absolute top-10 min-w-max dark:bg-zinc-500 dark:text-white rounded-lg p-1 group-hover:scale-100 transition-all duration-50 z-50 hover:hidden">
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
		<div className="h-full w-full place-items-start pb-4  grid grid-rows-[0.5fr_0.5fr]">

			<div className="ml-auto left-auto right-0 mt-2 mr-2 absolute">
				<a className="text-secondary text-left" href={props.companyHref} target="_blank" rel="noreferrer"
				   aria-label="Company website in new tab"
				   onClick={e => e.stopPropagation()}>
					<MNewTabIcon className="text-secondary text-3xl"/>
				</a>
			</div>

			<div className="bg-center w-full h-[10rem]  flex justify-center border-b-2 border-gray-200 rounded-t-lg">
				<div className="w-[80%] flex items-center">
					<Image width={1280} height={640} src={props.companyLogo} alt={props.companyName} />
				</div>
			</div>
			<div className="flex flex-col items-start mb-0 relative rounded-lg h-full w-full">

				<h3 className="text-xl font-bold text-secondary ml-6 mt-10">{props.companyName}</h3>
				<div className="p-6 block items-start justify-start">
					<p className="text-secondary text-left">Location: {props.location}</p>
					<p className="text-secondary text-left">Duration: {props.duration}</p>
					<p className="text-secondary text-left">Position: {props.position}</p>
				</div>
				<h3 className={`text-xl font-bold text-secondary ml-6
				${props.technologiesUsed ? '' : 'hidden'} 
					`}>
					Technologies used
				</h3>
				<div className="p-6 flex flex-wrap gap-x-4 gap-y-2">
					{technologies}
				</div>
			</div>

		</div>
	</>;
}