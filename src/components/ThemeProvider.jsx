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

// Resolve the preferred theme after hydration. The initial state must stay
// deterministic so the server and browser render the same markup.
function readPreferredThemeName() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (e) {
    // Ignore storage failures (private mode, disabled, etc.).
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  return 'light';
}

function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState('light');

  // Apply the saved/system preference after the first render, which keeps SSR
  // and hydration consistent while the anti-FOUC script handles first paint.
  useEffect(() => {
    setThemeName(readPreferredThemeName());
  }, []);

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
