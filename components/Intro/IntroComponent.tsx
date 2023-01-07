import Hero from "@components/Hero/Hero";

type IntroComponentProps = Parameters<typeof Hero>[0]

export default function IntroComponent(props: IntroComponentProps) {
	return (<>
		<section id={"home"}>
			<Hero {...props} />
		</section>
	</>)
}