import normalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

import { light, dark } from '../theme';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  html, body {
    height: 100%;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    font-size: 16px;
    font-size: 1.6rem;
    font-family: 'Bitter', monospace;
    word-break: break-word;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease, color 0.2s ease;
  }

  /*
   * Base pre-hydration colours driven by the data-theme attribute the SSR
   * anti-FOUC script sets on <html>. Ensures the first paint has the correct
   * background before styled-components' ThemeProvider hydrates.
   */
  html[data-theme='dark'] body {
    background: ${dark.background};
    color: ${dark.text};
  }

  html[data-theme='light'] body {
    background: ${light.background};
    color: ${light.text};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bitter', monospace;
    margin: 0.5em 0;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  iframe {
    margin: 0 auto;
    display: block;
    max-width: 100%;
    width: 100%;

    @media (min-width: 550px) {
      height: 34rem;
    }
  }

  blockquote {
    margin-left: 1em;
    margin-right: 1em;

    @media (min-width: 520px) {
      margin-left: 2em;
      margin-right: 2em;
    }
  }

  figure {
    margin: 0;
  }

  ul {
    padding: 0;
    list-style: square;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.link};
    border-bottom: 2px solid transparent;

    &:hover {
      color: ${({ theme }) => theme.linkHover};
      border-color: ${({ theme }) => theme.linkHover};
    }

    &.anchor {
      border: none;
    }
  }

  p {
    line-height: 1.5em;
    font-size: 1.8rem;
  }

  .sidebar {
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 520px) {
      width: calc(50% + 1em);
      clear: both;
      float: right;
      padding-left: 1em;
    }

    &.left {
      float: left;
      padding-left: 0;
      padding-right: 1em;
    }

    img {
      width: 100%;
    }
  }

  .blog-full,
  .blog-inset {
    margin-left: auto;
    margin-right: auto;
    width: 100%;

    img {
      width: 100%;
    }
  }

  .blog-inset {
    @media (min-width: 520px) {
      margin-top: 2em;
      margin-bottom: 2em;
      width: 80%;
    }
  }

  .home-image {
    margin-left: auto;
    margin-right: auto;
    width: 100%;

    img {
      width: 100%;
    }
  }

  .home-image {
    @media (min-width: 520px) {
      margin-top: 2em;
      margin-bottom: 2em;
      width: 100%;
    }
  }

  .blog-section {
    font-size: 1.8rem;

    &:not(:first-child) {
      margin-top: 2em;
    }

    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0.5em;

      & + p {
        margin-top: 0.5em;
      }
    }

    ul {
      margin-left: 1.5em;

      @media (min-width: 520px) {
        margin-left: 2.5em;
      }
    }

    li {
      margin: 0.5em 0;
      line-height: 1.5em;

      p {
        margin: 0;
      }
    }
  }

  :not(pre) > code[class*="language-"], pre[class*="language-"] {
    font-size: 0.9em;
  }

  .gatsby-highlight-code-line {
    background-color: ${({ theme }) => theme.codeHighlightBg};
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid ${({ theme }) => theme.codeHighlightBorder};
  }

  .gatsby-resp-image-wrapper {
    @media (min-width: 520px) {
      margin-top: 2em;
      margin-bottom: 2em;
      width: 80%;
    }
  }

  /*
   * Excalidraw diagrams are exported with transparent backgrounds but use dark
   * strokes/text. In dark mode, render them on a light card so they stay
   * legible; in light mode the card is transparent (no visible change).
   */
  .excalidraw-diagram {
    display: flex;
    justify-content: center;
  }

  .excalidraw-diagram svg {
    background: ${({ theme }) => theme.diagramCardBg};
    padding: ${({ theme }) => theme.diagramCardPadding};
    border-radius: 8px;
    max-width: 100%;
    height: auto;
  }

  /* Dark-mode adjustments for Prism (light prism.css is imported globally). */
  html[data-theme='dark'] {
    code[class*="language-"],
    pre[class*="language-"] {
      background: #2b2b2b;
      color: #e6e6e6;
      text-shadow: none;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #8a8a8a;
    }

    .token.punctuation {
      color: #cccccc;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: #f08d8d;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: #a5d6a7;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: #ddbb88;
    }

    .token.operator,
    .token.entity,
    .token.url {
      background: transparent;
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword {
      color: #8ab4ff;
    }

    .token.function,
    .token.class-name {
      color: #f0c674;
    }
  }
`;

export default GlobalStyle;
