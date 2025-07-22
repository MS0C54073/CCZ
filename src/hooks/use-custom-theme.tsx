
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';

type Theme = 'green' | 'blue' | 'black';

interface CustomThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

const themes: Theme[] = ['black', 'green', 'blue'];

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('black');

  useEffect(() => {
    const storedTheme = localStorage.getItem('custom-theme') as Theme;
    if (storedTheme && themes.includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove(...themes.map(t => `theme-${t}`));
    
    if (theme) {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  const cycleTheme = useCallback(() => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    setTheme(newTheme);
    localStorage.setItem('custom-theme', newTheme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme: (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('custom-theme', newTheme);
    },
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
