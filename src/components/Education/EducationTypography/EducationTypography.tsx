'use client';
import {Typography} from "@mui/material";

export default function EducationTypography(education: HomeContent['education'] ) {
	const itemSize = '1.5rem'
	return (<>

		<Typography sx={{color: 'text.primary', fontSize: '2.5rem'}} variant="h1" gutterBottom>
			{education.school}
		</Typography>

		<Typography sx={{color: 'text.primary', fontSize: itemSize}}>
			{education.college} - {education.location}
		</Typography>

		<Typography sx={{color: 'text.primary', fontSize: itemSize}}>
			{education.major}
		</Typography>

		<Typography sx={{color: 'text.primary', fontSize: itemSize}}>
			{education.graduation}
		</Typography>

	</>)
}