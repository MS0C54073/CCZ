
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
  const [theme, setThemeState] = useState<Theme>('black');

  useEffect(() => {
    const storedTheme = localStorage.getItem('custom-theme') as Theme | null;
    if (storedTheme && themes.includes(storedTheme)) {
      setThemeState(storedTheme);
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    themes.forEach(t => root.classList.remove(`theme-${t}`));

    // Add the new theme class
    root.classList.add(`theme-${newTheme}`);

    // Persist to state and localStorage
    setThemeState(newTheme);
    localStorage.setItem('custom-theme', newTheme);
  }, []);
  
  useEffect(() => {
      setTheme(theme);
  }, [theme, setTheme]);


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
