'use client';
import {ReactNode} from "react";
import useThemePreference from "@hooks/theme-preference";


export default function ClientBackground({children}: { children: ReactNode }) {
	useThemePreference()

	return (<>
				{children}
	</>)
}