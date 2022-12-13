'use client';

import {PaletteMode} from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
				// palette values for light mode
				background: {
					default: '#910a19',
				},

				text: {
					primary: '#000000',
					secondary: '#383838',
				},

				action: {
					active: '#001E3C',
				},

				primary: {
					main: '#910a19',
				},

				secondary: {
					main: '#ffffff',
					dark: '#000000'
				}
			}

			:

			{
				// palette values for dark mode
				background: {
					default: '#9f0416',
				},

				text: {
					primary: '#ffffff',
					secondary: '#b4b4b4',
				},

				action: {
					active: '#001E3C',
				},

				primary: {
					main: '#910a19',
				},

				secondary: {
					main: '#ffffff',
					dark: '#5e5e5e'
				}
			}),
	},
});

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}