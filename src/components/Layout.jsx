import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism.css';

import Nav from './Nav';
import Favicon from './Favicon';

import GlobalStyle from './GlobalStyle';

const Main = styled.main`
  max-width: 83rem;
  padding: 1em 1em 2em;
  margin: 0 auto;

  @media (min-width: 350px) {
    padding: 1em 1.5em 4em;
  }

  @media (min-width: 520px) {
    padding: 2rem 2em 6rem;
  }
`;

const StyledHeader = styled.header``;

const StyledTitle = styled.h1`
  margin: 0.3em 0;

  @media (min-width: 350px) {
    margin: 0.5em 0 0.2em;
  }

  @media (min-width: 520px) {
    margin: 0.667em 0;
  }
`;

const TitleLink = styled(Link)`
  color: #000;
  text-decoration: none;
  border: none;

  &:hover {
    color: #0000ff;
  }
`;

function Layout({ children }) {
  return (
    <Main>
      <GlobalStyle />
      <Favicon />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Bitter:400,700"
          rel="stylesheet"
        />
        <title>Blair Nangle</title>
        <meta property="og:title" content="Blair Nangle" />
        <meta property="og:description" content="Blair Nangle's personal website" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blairnangle.com" />
      </Helmet>
      <StyledHeader>
        <StyledTitle>
          <TitleLink to="/">Blair Nangle</TitleLink>
        </StyledTitle>
        <Nav />
      </StyledHeader>
      {children}
    </Main>
  );
}

export default Layout;
