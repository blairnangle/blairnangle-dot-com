import React from 'react';
import styled from 'styled-components';

import { useThemeToggle } from './ThemeProvider';

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2.2rem;
  line-height: 1;
  padding: 0.2em;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.link};
  }
`;

function ThemeToggle() {
  const { themeName, toggleTheme } = useThemeToggle();
  const isDark = themeName === 'dark';

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀' : '☾'}
    </ToggleButton>
  );
}

export default ThemeToggle;
