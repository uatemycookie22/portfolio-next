import AboutTypography from "./AboutTypography/AboutTypography";
import ImageText from "../ImageText/ImageTextComponent";
import styles from './AboutComponent.module.scss'

interface AboutProps {
	text: [string, string, string]
}

export default function AboutComponent({ text }: AboutProps) {

	const aboutTypography = text.map((section, i) => (<AboutTypography key={i}>
		{section}
	</AboutTypography>))

	return (<>
			{aboutTypography}
			<ul className={styles.imageTextList}>
				<li>
					<ImageText src={'/assets/ts.webp'}>TypeScript</ImageText>

				</li>
			</ul>
		</>)
}