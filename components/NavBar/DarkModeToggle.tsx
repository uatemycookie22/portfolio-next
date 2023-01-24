import {useAtom} from "jotai";
import {darkModeAtom} from "@atoms/dark-mode";
import {MDay, MNight} from "@icons";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DarkModeToggle = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function ToggleDarkmodeButton({onClick, ...rest}: Omit<DarkModeToggle, 'className'>) {
	const [darkMode] = useAtom(darkModeAtom)

	return (
		<button
			className={`font-medium py-2 px-4 w-fit text-hover-purple border-hover-purple
				transition-duration-300
				dark:text-white
				`}
			onClick={onClick}
			{...rest}
		>
			{darkMode ? <MNight/> : <MDay/>}
		</button>
	)
}