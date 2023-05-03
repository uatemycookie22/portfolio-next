'use client';
import {ReactNode} from "react";
import useThemePreference from "@hooks/theme-preference";


export default function ClientBackground({children}: { children: ReactNode }) {
	useThemePreference()

	return (<>
			<div  className="bg-zinc-200 dark:bg-zinc-900 transition-colors duration-150">
				{children}
			</div>
	</>)
}