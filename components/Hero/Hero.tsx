import Image from "next/image";
import SimpleCard from "@components/SimpleCard/SimpleCard";
import {ReactNode} from "react";
import {MDnsIcon, MEmojiEventsIcon, MAccessTimeIcon, MGitHub, MLinkedIn} from '@icons'

const CardHeading = ({ children, heading }: { children?: ReactNode, heading?: string }) => (<>
	<div className="flex justify-between lg:gap-4">
		<h3 className="flex text-xl font-semibold text-primary items-center">{heading}</h3>
		{children}
	</div>
	<div className="w-full h-[1px] bg-secondary mt-2 mb-2" />
</>)

interface HeroProps {
	primary: string
	facts: { heading: string, text: string }[]
}

export default function Hero(props: HeroProps) {
	return (
		<>
				<div className="bg-center bg-no-repeat bg-cover h-min-screen" style={{ backgroundImage: `none` }}>
					<div className="flex flex-col gap-y-12 h-full justify-center px-8 text-white">
						<div className="flex justify-center">


						<div className="mt-56 max-w-lg">
							<h1 className="text-4xl font-bold mb-2">Lysander Hernandez</h1>
							<p className="text-xl mb-8">{props.primary}</p>
							<a href="#" className="text-sl btn bg-interactive-primary hover:bg-interactive-secondary text-primary font-bold py-2 px-4 rounded-lg">
								View my work
							</a>
							<div className="relative top-10 h-16 flex gap-x-3">
								<a href="https://github.com/uatemycookie22" target="_blank" rel="noreferrer" aria-label="My GitHub">
									<MGitHub fontSize='large' className="text-gray-400 hover:text-primary hover:cursor-pointer transition-colors duration-300" />
								</a>
								<a href="https://linkedin.com/in/lysander-hernandez-cs-unt/" target="_blank" rel="noreferrer" aria-label="My LinkedIn">
									<MLinkedIn fontSize='large' className="text-gray-400 hover:text-primary hover:cursor-pointer transition-colors duration-300" />
								</a>
							</div>
						</div>
							<Image className={`hidden md:block transition-opacity duration-500 delay-200 ease-in-out w-auto h-[500px]
							
							`} src={'/assets/headshot1.png'} alt={'headshot of Lysander'} width={400} height={533} priority={true}/>
						</div>


							<div className="bg-none py-8 self-center">
								<div className="container">
									<h2 className="section-heading text-2xl text-left lg:text-center">Key Facts</h2>
									<div className="block lg:grid lg:grid-cols-3 gap-x-16">
										<SimpleCard>

											<CardHeading heading={props.facts[0].heading}>
												<MAccessTimeIcon className="text-4xl text-primary" />
											</CardHeading>

											<p className="text-primary text-base">
												{props.facts[0].text}
											</p>

										</SimpleCard>

										<SimpleCard>

											<CardHeading heading={props.facts[1].heading}>
												<MDnsIcon className="text-4xl text-primary" />
											</CardHeading>

											<p className="text-primary text-base">
												{props.facts[1].text}
											</p>

										</SimpleCard>

										<SimpleCard>

											<CardHeading heading={props.facts[2].heading}>
												<MEmojiEventsIcon className="text-4xl text-primary" />
											</CardHeading>

											<p className="text-primary text-base">
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