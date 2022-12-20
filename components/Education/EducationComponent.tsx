import {CommonSectionProps} from "../component_props/main-section-props";
import EducationTypography from "./EducationTypography/EducationTypography";
import common from '/styles/common.module.scss'
import styles from "../Intro/IntroComponent.module.scss";
import Image from "next/image";

export default function EducationComponents({heading, index, id}: CommonSectionProps) {
	return (<>
		<section>
			<header className={common.sectionHeading}>
				Education
			</header>

			<EducationTypography/>

			<div className={styles.headshotContainer}>
				<Image
					alt="" src="/favicon.ico"
					width={100}
					height={100}
				/>
			</div>
		</section>
	</>)
}