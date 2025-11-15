'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../atoms/dark-mode';

export default function ThemeManager() {
    const [darkMode, setDarkmode] = useAtom(darkModeAtom);

    // Initialize theme preference on mount
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = darkMode ?? prefersDark;
        
        document.documentElement.classList.toggle('dark', shouldBeDark);
        setDarkmode(shouldBeDark);
    }, []); // eslint-disable-line

    // Apply theme changes
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return null;
}