
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type Theme = 'green' | 'blue' | 'black';

interface CustomThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

const themes: Theme[] = ['green', 'blue', 'black'];

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('black');

  useEffect(() => {
    const storedTheme = localStorage.getItem('custom-theme') as Theme;
    if (storedTheme && themes.includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove(...themes.map(t => `theme-${t}`));
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('custom-theme', theme);
  }, [theme]);
  
  const cycleTheme = useCallback(() => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    cycleTheme,
  };

  return <CustomThemeContext.Provider value={value}>{children}</CustomThemeContext.Provider>;
}

export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}
