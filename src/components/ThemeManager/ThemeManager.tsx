'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../atoms/dark-mode';

export default function ThemeManager() {
    const [darkMode] = useAtom(darkModeAtom);

    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [darkMode]);

    return null;
}