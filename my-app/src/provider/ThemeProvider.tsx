import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(() => {
        try {
            const stored = localStorage.getItem('theme');
            if (stored === 'dark' || stored === 'light') return stored;
        } catch (e){
            console.log(e)
        }
        return 'light';
    });

    const toggleTheme = () => {
        setTheme(prev => {
            const next = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', next);
            return next;
        });
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;