import AboutTypography from "./AboutTypography/AboutTypography";
import ImageText from "../ImageText/ImageTextComponent";
import styles from './AboutComponent.module.scss'

interface AboutProps {
	text: [string, string, string]
}

export default function AboutComponent({ text }: AboutProps) {

	const aboutTypography = text.map(section => (<AboutTypography>
		{section}
	</AboutTypography>))

	return (<>
			{aboutTypography}
			<li className={styles.imageTextList}>
				<ul>
					<ImageText src={'/assets/ts.png'}>TypeScript</ImageText>

				</ul>
			</li>
		</>)
}