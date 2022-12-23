import AboutTypography from "./AboutTypography/AboutTypography";
import ImageText from "../ImageText/ImageTextComponent";
import styles from './AboutComponent.module.scss'

export default function AboutComponent() {
	return (<>
			<AboutTypography />
			<li className={styles.imageTextList}>
				<ul>
					<ImageText src={'/assets/ts.png'}>TypeScript</ImageText>

				</ul>
			</li>
		</>)
}