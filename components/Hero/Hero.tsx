import Image from "next/image";
import MAccessTime from "@components/WrappedIcons/MAccessTimeIcon";
import SimpleCard from "@components/SimpleCard/SimpleCard";
import {ReactNode} from "react";
import MDnsIcon from "@components/WrappedIcons/DnsIcon";
import MEmojiEventsIcon from "@components/WrappedIcons/EmojiEventsIcon";

const CardHeading = ({ children, heading }: { children?: ReactNode, heading?: string }) => (<>
	<div className="flex justify-between lg:gap-4">
		<h3 className="flex text-xl font-bold text-primary items-center">{heading}</h3>
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
			<div>
				<div className=" bg-center bg-no-repeat bg-cover h-min-screen" style={{ backgroundImage: `url(./image.jpg)` }}>
					<div className="flex flex-col gap-y-16 h-full justify-center px-8 py-6 text-white">
						<div className="flex justify-center">


						<div className="mt-56 max-w-lg">
							<h1 className="text-4xl font-bold mb-2">Lysander Hernandez</h1>
							<p className="text-xl mb-8">{props.primary}</p>
							<a href="#" className="text-sl btn bg-interactive-primary hover:bg-interactive-secondary text-primary font-bold py-2 px-4 rounded-lg">
								View my work
							</a>
						</div>
							<Image className={`hidden md:block transition-opacity duration-500 delay-200 ease-in-out
							
							`} src={'/assets/headshot1.png'} alt={'headshot of Lysander'} width={400} height={400}/>
						</div>


							<div className="bg-none py-8">
								<div className="container mx-auto">
									<h2 className="text-2xl font-bold mb-4 text-primary text-center">Key Facts</h2>
									<div className="block lg:grid lg:grid-cols-3 -mx-4">
										<SimpleCard>

											<CardHeading heading={props.facts[0].heading}>
												<MAccessTime className="text-4xl text-primary" />
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



			</div>

		</>)
}