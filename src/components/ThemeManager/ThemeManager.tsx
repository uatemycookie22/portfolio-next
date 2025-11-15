'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../atoms/dark-mode';

export default function ThemeManager() {
    const [darkMode, setDarkmode] = useAtom(darkModeAtom);

    // Initialize theme preference on mount
    useEffect(() => {
        if (!darkMode || window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.classList.remove('dark');
            setDarkmode(false);
        } else {
            document.documentElement.classList.add('dark');
            setDarkmode(true);
        }
    }, []); // eslint-disable-line

    // Apply theme changes
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return null;
}