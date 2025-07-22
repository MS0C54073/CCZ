
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';

type Theme = 'green' | 'blue' | 'black';

interface CustomThemeContextType {
  theme: Theme;
  cycleTheme: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

const themes: Theme[] = ['black', 'green', 'blue'];

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('black');

  useEffect(() => {
    const storedTheme = localStorage.getItem('custom-theme') as Theme | null;
    const initialTheme = storedTheme && themes.includes(storedTheme) ? storedTheme : 'black';
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    themes.forEach(t => root.classList.remove(`theme-${t}`));

    // Add the new theme class
    root.classList.add(`theme-${theme}`);
    localStorage.setItem('custom-theme', theme);
  }, [theme]);


  const cycleTheme = useCallback(() => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    cycleTheme,
  }), [theme, cycleTheme]);

  return <CustomThemeContext.Provider value={value}>{children}</CustomThemeContext.Provider>;
}

export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}
