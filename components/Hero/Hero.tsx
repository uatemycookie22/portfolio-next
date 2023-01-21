import Image from "next/image";
import SimpleCard from "@components/SimpleCard/SimpleCard";
import {ReactNode} from "react";
import {MDnsIcon, MEmojiEventsIcon, MAccessTimeIcon, MGitHub, MLinkedIn} from '@icons'
import PdfButton from "@components/PdfButton/PdfButton";

const CardHeading = ({ children, heading }: { children?: ReactNode, heading?: string }) => (<>
	<div className="flex justify-between lg:gap-4">
		<h3 className="flex text-xl font-semibold text-white items-center">{heading}</h3>
		{children}
	</div>
	<div className="w-full h-[1px] mt-2 mb-2 dark:bg-white" />
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
						<div className="w-full pl-4 grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] place-items-start lg:place-items-end">


						<div className="mt-56 max-w-lg">
							<h1 className="text-4xl font-bold mb-2">Lysander Hernandez</h1>
							<p className="text-xl mb-8 text-slate">{props.primary}</p>
							<PdfButton href="/assets/files/lh-resume.pdf">
								Resume
							</PdfButton>
							<div className="relative top-10 h-16 flex gap-x-3">
								<a href="https://github.com/uatemycookie22" target="_blank" rel="noreferrer" aria-label="My GitHub">
									<MGitHub fontSize='large' className={`text-neutral hover:text-white hover:cursor-pointer transition-duration-300i
									dark:hover:text-violet-600
									`} />
								</a>
								<a href="https://linkedin.com/in/lysander-hernandez-cs-unt/" target="_blank" rel="noreferrer" aria-label="My LinkedIn">
									<MLinkedIn fontSize='large' className={`text-neutral hover:text-white hover:cursor-pointer transition-duration-300i
									 dark:hover:text-violet-600
									`} />
								</a>
							</div>
						</div>
							<div className="w-full relative">
									<Image className={`hidden lg:block absolute right-0 left-auto rounded-[5rem]
									transition-opacity duration-500 delay-200 ease-in-out w-full h-[533px]
									bg-cover
									dark:text-violet-600 dark:filter-purple
									`} src={'/assets/wavy-shape.png'} alt={'headshot of Lysander'} width={3000} height={5000} priority={true}
											       style={{

											       }}
											/>

								<Image className={`hidden lg:block relative transition-opacity duration-500 delay-200 ease-in-out w-full h-[533px] z-10
							bg-cover object-contain
							dark:text-violet-600
							`} src={'/assets/headshot1.png'} alt={'headshot of Lysander'} width={400} height={533} priority={true}
								/>
							</div>

						</div>


							<div className="bg-none py-8 self-center lg:px-8">
								<div className="w-full lg:container">
									<h2 className="section-heading text-2xl text-left lg:text-center">Key Facts</h2>
									<div className="block lg:grid lg:grid-cols-3 gap-x-16">
										<SimpleCard>

											<CardHeading heading={props.facts[0].heading}>
												<MAccessTimeIcon className="text-4xl text-white" />
											</CardHeading>

											<p className="text-white text-base dark:text-slate">
												{props.facts[0].text}
											</p>

										</SimpleCard>

										<SimpleCard>

											<CardHeading heading={props.facts[1].heading}>
												<MDnsIcon className="text-4xl text-white" />
											</CardHeading>

											<p className="text-white text-base dark:text-slate">
												{props.facts[1].text}
											</p>

										</SimpleCard>

										<SimpleCard>

											<CardHeading heading={props.facts[2].heading}>
												<MEmojiEventsIcon className="text-4xl text-white" />
											</CardHeading>

											<p className="text-white text-base dark:text-slate">
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