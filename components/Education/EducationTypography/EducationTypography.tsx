'use client';
import {Typography} from "@mui/material";

export default function EducationTypography() {
	const itemSize = '1.5rem'
	return (<>

		<Typography sx={{color: 'text.primary', fontSize: '2.5rem'}} variant="h1" gutterBottom>

			University of North Texas

		</Typography>

		<Typography sx={{color: 'text.primary', fontSize: itemSize}} variant="body1" gutterBottom>


				College of Engineering - Denton, Texas







		</Typography>

		<Typography sx={{color: 'text.primary', fontSize: itemSize}}>
			B.S. Computer Science
		</Typography>

		<Typography sx={{color: 'text.primary', fontSize: itemSize}}>
			Expected May 2025
		</Typography>

	</>)
}