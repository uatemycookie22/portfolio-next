import Image from "next/image";
import SimpleCard from "@components/SimpleCard/SimpleCard";
import {ReactNode} from "react";
import {MDnsIcon, MEmojiEventsIcon, MAccessTimeIcon, MGitHub, MLinkedIn} from '@icons'
import PdfButton from "@components/PdfButton/PdfButton";

const CardHeading = ({ children, heading }: { children?: ReactNode, heading?: string }) => (<>
	<div className="flex justify-between lg:gap-4">
		<h3 className="flex text-xl font-semibold text-black dark:text-white items-center">{heading}</h3>
		{children}
	</div>
	<div className="w-full h-[1px] mt-2 mb-2 bg-black dark:bg-white" />
</>)

interface HeroProps {
	primary: string
	facts: { heading: string, text: string }[]
}

export default function Hero(props: HeroProps) {
	return (
		<>
				<div className="bg-center bg-no-repeat px-8 lg:px-0 bg-cover h-min-screen" style={{ backgroundImage: `none` }}>
					<div className="flex flex-col gap-y-12 h-full justify-center text-white">
						<div className="w-full pl-4 grid grid-cols-[repeat(auto-fit,minmax(min(34rem,90%),1fr))] place-items-start lg:place-items-end">


						<div className="mt-56 max-w-lg">
							<h1 className={`text-4xl font-extrabold mb-2 text-transparent bg-clip-text 
								bg-gradient-to-r from-violet-700 to-violet-500`}>
								Lysander Hernandez
							</h1>
							<p className="text-xl mb-8 text-slate-800 dark:text-slate-300">{props.primary}</p>
							<PdfButton href="/assets/files/lh-resume.pdf">
								Resume
							</PdfButton>
							<div className="relative top-10 h-16 flex gap-x-3">
								<a href="https://github.com/uatemycookie22" target="_blank" rel="noreferrer" aria-label="My GitHub">
									<MGitHub fontSize='large' className={`text-neutral
									hover:cursor-pointer transition-duration-300i
									text-hover-purple
									`} />
								</a>
								<a href="https://linkedin.com/in/lysander-hernandez-cs-unt/" target="_blank" rel="noreferrer" aria-label="My LinkedIn">
									<MLinkedIn fontSize='large' className={`text-neutral 
										hover:cursor-pointer transition-duration-300i
									  text-hover-purple
									`} />
								</a>
							</div>
						</div>
							<div className="w-full relative flex justify-center">
									<Image className={`hidden lg:block absolute rounded-[5rem]
									transition-opacity duration-500 delay-200 ease-in-out w-[911px] h-[533px]
									bg-cover object-cover filter-purple
									`} src={'/assets/wavy-shape.png'} alt={'headshot background'} fill={true} priority={true}
											/>

								<Image className={`hidden lg:block transition-opacity duration-500 delay-200 
								ease-in-out w-fit h-[533px] z-10 bg-cover
							`} src={'/assets/headshot-prod.png'} alt={'headshot of Lysander'} width={400} height={533} priority={true}
								/>
							</div>

						</div>


							<div className="bg-none py-8 self-center lg:px-8">
								<div className="w-full lg:container">
									<h2 className="section-heading text-2xl text-left lg:text-center text-black dark:text-white" >About Me</h2>
									<div className="block lg:grid lg:grid-cols-3 gap-x-16">
										<SimpleCard>

											<CardHeading heading={props.facts[0].heading}>
												<MAccessTimeIcon className="text-4xl text-black dark:text-white" />
											</CardHeading>

											<p className="text-base text-slate-800 dark:text-slate-300">
												{props.facts[0].text}
											</p>

										</SimpleCard>

										<SimpleCard>

											<CardHeading heading={props.facts[1].heading}>
												<MDnsIcon className="text-4xl text-black dark:text-white" />
											</CardHeading>

											<p className="text-slate-800 text-base dark:text-slate-300">
												{props.facts[1].text}
											</p>

										</SimpleCard>

										<SimpleCard>

											<CardHeading heading={props.facts[2].heading}>
												<MEmojiEventsIcon className="text-4xl text-black dark:text-white" />
											</CardHeading>

											<p className="text-slate-800 text-base dark:text-slate-300">
												{props.facts[2].text}
											</p>

										</SimpleCard>

									</div>
								</div>
							</div>




					</div>

				</div>
		</>)
}