'use client';

import {ReactNode} from "react";
import {ThemeProvider} from "@mui/material";
import {mainTheme} from "../themes/main-theme";

export function MainThemeProvider ({children}: { children: ReactNode }) {
	return (<>
			<ThemeProvider theme={mainTheme}>
				{children}
			</ThemeProvider>
		</>
	)}