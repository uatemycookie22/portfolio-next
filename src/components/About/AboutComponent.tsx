import AboutTypography from "./AboutTypography/AboutTypography";
import ImageText from "../ImageText/ImageTextComponent";

interface AboutProps {
	text: [string, string, string]
}

export default function AboutComponent({ text }: AboutProps) {

	const aboutTypography = text.map((section, i) => (<AboutTypography key={i}>
		{section}
	</AboutTypography>))

	return (<>
			{aboutTypography}
			<ul className="list-none">
				<li className="text-white">
					<ImageText src={'/assets/ts.webp'}>TypeScript</ImageText>

				</li>
			</ul>
		</>)
}