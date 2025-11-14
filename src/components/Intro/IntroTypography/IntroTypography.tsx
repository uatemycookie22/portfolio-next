'use client';

import {Button, ButtonProps, styled, Typography} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ColorButton = styled(Button)<ButtonProps>(() => ({
	color: 'white',
	backgroundColor: 'rgba(255,255,255,0)',
	'&:hover': {
		backgroundColor: 'rgba(255,255,255,.04)',
	},
}));

export default function IntroTypography() {
	return (
		<>
			<Typography sx={{color: 'text.primary', fontSize: '2.25rem'}} variant="body1" gutterBottom>

				My name is Lysander Hernandez.

			</Typography>

			<Typography sx={{color: 'text.primary', fontSize: '1.75rem'}} variant="body2" gutterBottom>
				I am a computer science student at the
	
				<span style={{color: '#00853e'}}> University of North Texas. </span>
	
			</Typography>

			<Typography sx={{color: 'text.primary', fontSize: '1.5rem'}} variant="body2" gutterBottom>

				Software engineering is an industry where one can spend an entire career in and still have much to learn about it.

				And that&apos;s why I love it.

			</Typography>


			<Typography sx={{color: 'text.primary', fontSize: '1.5rem'}} variant="body2" gutterBottom>

				Learn more about me

				<ColorButton variant="text"
	         style={{
	           borderRadius: '50%',
	           width: '5rem',
	           height: '5rem',
		         marginLeft: '2rem',
	         }}
						aria-label="scroll down"
				>

					<ArrowDownwardIcon sx={{
						color: 'secondary.main',
						fontSize: '3rem',
					}} className="blink" />

				</ColorButton>

			</Typography>
		</>
	)
}