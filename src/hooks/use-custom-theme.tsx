
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';

type Theme = 'green' | 'blue' | 'black';

interface CustomThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

const themes: Theme[] = ['green', 'blue', 'black'];

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('black');

  useEffect(() => {
    const storedTheme = localStorage.getItem('custom-theme') as Theme | null;
    const initialTheme = storedTheme && themes.includes(storedTheme) ? storedTheme : 'black';
    setThemeState(initialTheme);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    if (themes.includes(newTheme)) {
        setThemeState(newTheme);
        localStorage.setItem('custom-theme', newTheme);
    }
  }, []);

  useEffect(() => {
    // Clear all possible theme classes
    document.body.classList.remove(...themes.map(t => `theme-${t}`));
    // Add the current theme class
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const cycleTheme = useCallback(() => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    cycleTheme,
  }), [theme, setTheme, cycleTheme]);

  return <CustomThemeContext.Provider value={value}>{children}</CustomThemeContext.Provider>;
}

export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}
