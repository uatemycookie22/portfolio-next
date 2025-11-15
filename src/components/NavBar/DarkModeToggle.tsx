import {useAtom} from "jotai";
import {darkModeAtom} from "../../atoms/dark-mode";
import {Sun, Moon} from "lucide-react";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import useLoaded from "../../hooks/loaded";

type DarkModeToggle = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function ToggleDarkmodeButton({onClick, ...rest}: Omit<DarkModeToggle, 'className'>) {
	const [darkMode] = useAtom(darkModeAtom)
	const loaded = useLoaded()

	if (!loaded) return (<></>)

	return (
		<button
			className={`font-medium py-2 px-4 w-fit text-hover-purple border-hover-fade-purple
				transition-duration-300
				dark:text-white
				`}
			aria-label={'Toggle dark mode'}
			onClick={onClick}
			{...rest}
		>
			{darkMode ? <Moon/> : <Sun/>}
		</button>
	)
}