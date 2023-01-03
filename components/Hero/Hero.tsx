import Image from "next/image";

export default function Hero() {
	return (
		<>
			<div className="bg-gray-900 text-white py-12">
				<div className="container mx-auto flex items-center px-4 lg:px-0">
					<div className="w-full lg:w-1/2 pr-4">
						<Image width={64} height={64} className="rounded-full h-64 w-64" src="/assets/selfie0.jpg" alt="Web Developer Portrait" />
					</div>
					<div className="w-full lg:w-1/2 pl-4">
						<h1 className="text-3xl font-bold leading-tight mb-4">Web Developer</h1>
						<p className="text-xl font-light leading-normal mb-8">Crafting beautiful and functional websites, one line
							of code at a time.</p>
						<a href="#"
						   className="bg-transparent hover:bg-white hover:text-gray-900 font-semibold py-2 px-4 border border-white hover:border-transparent rounded">Contact
							Me</a>
					</div>
				</div>
			</div>

		</>)
}