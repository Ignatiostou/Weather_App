import React, { useContext } from 'react';
import { createContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const InitialThemeProviderState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(
  InitialThemeProviderState,
);

const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = document.documentElement
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const appliedTheme = theme === 'system' ? (isSystemDark ? 'dark' : 'light') : theme

    // Set attribute for any components reading data-theme
    root.setAttribute('data-theme', appliedTheme)
    // Also toggle the .dark class so existing CSS rules targeting .dark work
    if (appliedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    },
    
    
  };
  
  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
};

export const useTheme = () => {
    const Context=useContext(ThemeProviderContext);
    if(Context===undefined){
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return Context;
};

export default ThemeProvider;
