'use client';

import {Typography} from "@mui/material";
import {ReactNode} from "react";

export default function AboutTypography({ children }: { children: ReactNode}) {
	return (
			<Typography sx={{color: 'text.primary', fontSize: '1.5rem'}} variant="body2" gutterBottom>

				{children}

			</Typography>
	)
}