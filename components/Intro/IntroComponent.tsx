import {CommonSectionProps} from "../component_props/main-section-props";
import Hero from "@components/Hero/Hero";

export default function IntroComponent({ id }: CommonSectionProps) {
	return (<>
		<section id={id}>
			<Hero />
		</section>
	</>)
}