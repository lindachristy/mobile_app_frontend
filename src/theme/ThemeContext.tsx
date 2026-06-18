import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

const light = {
  background: '#ffffff',
  text: '#1a1a1a',
  subtext: '#666666',
  dot: '#cccccc',
  dotActive: '#007AFF',
  skipBorder: '#007AFF',
  skipText: '#007AFF',
  btnPrimary: '#007AFF',
  btnPrimaryText: '#ffffff',
};

const dark = {
  background: '#121212',
  text: '#f0f0f0',
  subtext: '#aaaaaa',
  dot: '#444444',
  dotActive: '#4da3ff',
  skipBorder: '#4da3ff',
  skipText: '#4da3ff',
  btnPrimary: '#4da3ff',
  btnPrimaryText: '#ffffff',
};

export type Theme = typeof light;

const ThemeContext = createContext<Theme>(light);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? dark : light;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
