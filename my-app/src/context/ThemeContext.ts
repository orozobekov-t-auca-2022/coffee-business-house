import { createContext } from "react";

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {
        const currentTheme = localStorage.getItem('theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    }
})