// Theme tokens consumed via styled-components ThemeProvider.
// `name` matches the value persisted in localStorage and the `data-theme`
// attribute set on <html> by the anti-FOUC script in gatsby-ssr.js.

export const light = {
  name: 'light',
  background: '#ffffff',
  text: '#1a1a1a',
  link: '#0000ff',
  linkHover: '#0000ff',
  muted: '#999999',
  titleText: '#000000',
  codeHighlightBg: '#feb',
  codeHighlightBorder: '#f99',
  // Diagrams already have their own light look; no card needed in light mode.
  diagramCardBg: 'transparent',
  diagramCardPadding: '0',
};

export const dark = {
  name: 'dark',
  background: '#1a1a1a',
  text: '#e6e6e6',
  link: '#8ab4ff',
  linkHover: '#adc8ff',
  muted: '#8a8a8a',
  titleText: '#f2f2f2',
  codeHighlightBg: '#3a3320',
  codeHighlightBorder: '#8a6d3b',
  // Excalidraw SVGs use dark strokes; render them on a light card so they
  // stay legible on the dark page.
  diagramCardBg: '#ffffff',
  diagramCardPadding: '1em',
};

export const themes = { light, dark };

export const getTheme = (name) => (name === 'dark' ? dark : light);
