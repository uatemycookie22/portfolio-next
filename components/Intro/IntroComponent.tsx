import Hero from "@components/Hero/Hero";

type IntroComponentProps = Parameters<typeof Hero>[0]

export default function IntroComponent(props: IntroComponentProps) {
	return (<>
		<section id={"home"} className="bg-gradient-to-t from-primary to-black">
			<Hero {...props} />
		</section>
	</>)
}