import React, {
  createContext, useContext, useMemo, useState, useCallback, useEffect,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { getTheme } from '../theme';

export const STORAGE_KEY = 'theme';

const ThemeToggleContext = createContext({
  themeName: 'light',
  toggleTheme: () => {},
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

// Read the theme the anti-FOUC script already resolved and wrote to <html>.
// Falls back to system preference, then light, when running without that
// script (e.g. during SSR).
function readInitialThemeName() {
  if (typeof document !== 'undefined') {
    const fromAttr = document.documentElement.getAttribute('data-theme');
    if (fromAttr === 'light' || fromAttr === 'dark') {
      return fromAttr;
    }
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  return 'light';
}

function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(readInitialThemeName);

  // Keep <html data-theme> and localStorage in sync with React state.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, themeName);
    } catch (e) {
      // Ignore storage failures (private mode, disabled, etc.).
    }
  }, [themeName]);

  const toggleTheme = useCallback(() => {
    setThemeName((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const contextValue = useMemo(
    () => ({ themeName, toggleTheme }),
    [themeName, toggleTheme],
  );

  return (
    <ThemeToggleContext.Provider value={contextValue}>
      <StyledThemeProvider theme={getTheme(themeName)}>
        {children}
      </StyledThemeProvider>
    </ThemeToggleContext.Provider>
  );
}

export default ThemeProvider;
