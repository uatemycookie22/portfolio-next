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

export default function Hero() {
	return (
		<>
			<div>
				<div className=" bg-center bg-no-repeat bg-cover h-min-screen" style={{ backgroundImage: `url(./image.jpg)` }}>
					<div className="flex flex-col gap-y-16 h-full justify-center px-4 py-6 text-white">
						<div className="flex justify-center">


						<div className="mt-56 max-w-lg">
							<h1 className="text-4xl font-bold mb-2">Lysander Hernandez</h1>
							<p className="text-xl mb-8">I am a web developer specializing in building modern, responsive websites.</p>
							<a href="#" className="text-sl btn bg-interactive-primary hover:bg-interactive-secondary text-primary font-bold py-2 px-4 rounded-full">
								View my work
							</a>
						</div>
							<Image className="hidden md:block" src={'/assets/headshot1.png'} alt={'headshot of Lysander'} width={400} height={400}/>
						</div>


							<div className="bg-none py-8">
								<div className="container mx-auto px-4">
									<h2 className="text-2xl font-bold mb-4 text-primary text-center">Key Facts</h2>
									<div className="block lg:grid lg:grid-cols-3 -mx-4">
										<SimpleCard>

											<CardHeading heading={'5+ years of experience'}>
												<MAccessTime className="text-4xl text-primary" />
											</CardHeading>

											<p className="text-primary text-base">
												I have over 5 years of experience as a self taught programmer. I also have 2 amazing internships of experience
												with a strong background in both front-end and back-end web development.
											</p>

										</SimpleCard>

										<SimpleCard>

											<CardHeading heading={'Fullstack skills'}>
												<MDnsIcon className="text-4xl text-primary" />
											</CardHeading>

											<p className="text-primary text-base">
												I am skilled in a wide range of programming languages and technologies, including React.js, SCSS, SQL, Spring Boot, and GraphQL.
												I have experience building fullstack web applications from start to finish, and am comfortable working with both front-end
												and back-end frameworks.
											</p>

										</SimpleCard>

										<SimpleCard>

											<CardHeading heading={'Ambition'}>
												<MEmojiEventsIcon className="text-4xl text-primary" />
											</CardHeading>

											<p className="text-primary text-base">
												I am an ambitious individual with a passion for both web development and machine learning,
												constantly seeking out new challenges and learning opportunities to further advance their skills and career.
											</p>

										</SimpleCard>

									</div>
								</div>
							</div>




					</div>

				</div>



			</div>


			{/*<div className="bg-gray-900 text-white py-12">*/}
			{/*	<div className="container mx-auto flex items-center px-4 lg:px-0">*/}
			{/*		<div className="w-full lg:w-1/2 pr-4">*/}
			{/*			<Image width={64} height={64} className="rounded-full h-64 w-64" src="/assets/selfie0.jpg" alt="Web Developer Portrait" />*/}
			{/*		</div>*/}
			{/*		<div className="w-full lg:w-1/2 pl-4">*/}
			{/*			<h1 className="text-3xl font-bold leading-tight mb-4">Lysander Hernandez</h1>*/}
			{/*			<p className="text-xl font-light leading-normal mb-8">*/}
			{/*				I am a computer science student at the University of North Texas.*/}
			{/*				Software engineering is an industry where one can spend an entire career in and still have much to learn about it.*/}

			{/*				And that&apos;s why I love it.*/}
			{/*			</p>*/}
			{/*			<a href="#"*/}
			{/*			   className="bg-transparent hover:bg-white hover:text-gray-900 font-semibold py-2 px-4 border border-white hover:border-transparent rounded">Contact*/}
			{/*				Me</a>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}

		</>)
}