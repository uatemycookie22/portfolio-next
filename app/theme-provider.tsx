'use client';

import {ReactNode, useMemo, useState} from "react";
import {createTheme, PaletteMode, ThemeProvider} from "@mui/material";
import {getDesignTokens} from "../themes/main-theme";

export function MainThemeProvider ({children}: { children: ReactNode }) {
	const [mode, setMode] = useState<PaletteMode>('dark');
	const colorMode = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) =>
					prevMode === 'light' ? 'dark' : 'light',
				);
			},
		}),
		[],
	);

	// Update the theme only if the mode changes
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (<>
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</>
	)}