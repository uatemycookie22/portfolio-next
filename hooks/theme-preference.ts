'use client';

import {useEffect} from "react";
import {useAtom} from "jotai";
import {darkModeAtom} from "@atoms/dark-mode";

export default function useThemePreference() {
	const [darkMode, setDarkmode] = useAtom(darkModeAtom)

	useEffect(() => {
		if (!darkMode || window.matchMedia('(prefers-color-scheme: light)').matches) {
			document.documentElement.classList.remove('dark')
			setDarkmode(false)
		} else {
			document.documentElement.classList.add('dark')
			setDarkmode(true)
		}
	}, []) // eslint-disable-line

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
	}, [darkMode])
}