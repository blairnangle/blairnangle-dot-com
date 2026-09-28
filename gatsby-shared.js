import React from 'react';

import ThemeProvider from './src/components/ThemeProvider';

// Shared between gatsby-browser.js and gatsby-ssr.js so the ThemeProvider
// wraps every page in both the browser and during SSR.
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
