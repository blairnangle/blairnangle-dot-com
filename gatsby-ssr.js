import React from 'react';

export { wrapRootElement } from './gatsby-shared';

// Runs before the page paints to set the correct theme on <html>, avoiding a
// flash of the wrong theme. Mirrors the resolution logic in ThemeProvider.
const themeScript = `
(function() {
  try {
    var stored = window.localStorage.getItem('theme');
    var theme = (stored === 'light' || stored === 'dark')
      ? stored
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    // eslint-disable-next-line react/no-danger
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />,
  ]);
};
