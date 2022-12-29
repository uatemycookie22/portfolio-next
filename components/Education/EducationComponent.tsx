import {CommonSectionProps} from "../component_props/main-section-props";
import EducationTypography from "./EducationTypography/EducationTypography";
import common from '@styles/common.module.scss'
import Image from "next/image";


type EducationProps = Pick<HomeContent, 'education'> & CommonSectionProps

export default function EducationComponents({education}: EducationProps) {
	return (<>
		<section>
			<header className={common.sectionHeading}>
				Education
			</header>

			<EducationTypography {...education} />

			<div>
				<Image
					alt="" src="/favicon.ico"
					width={100}
					height={100}
				/>
			</div>
		</section>
	</>)
}