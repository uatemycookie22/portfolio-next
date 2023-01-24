'use client';
import {ReactNode} from "react";
import {useAtom} from "jotai";
import {darkModeAtom} from "@atoms/dark-mode";

export default function ClientBackground({children}: { children: ReactNode }) {
	const [darkMode] = useAtom(darkModeAtom)
	console.log(darkMode)
	return (<>
		<div  className={`bg-transparent
		${darkMode ? 'dark': ''}
		`}>
			<div  className="bg-zinc-200 dark:bg-zinc-900 transition-colors duration-150">
				{children}
			</div>
		</div>

	</>)
}