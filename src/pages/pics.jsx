import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Layout from '../components/Layout';

const YearList = styled.ul`
  list-style: square;
  margin-left: 1.5em;
`;

function PicsPage({ data }) {
  const years = data.allDirectory.nodes
    .map(({ relativePath }) => relativePath)
    .filter((year) => /^\d{4}$/.test(year))
    .sort((a, b) => b.localeCompare(a));

  return (
    <Layout>
      <Helmet>
        <title>Blair Nangle | Pics</title>
        <meta property="og:title" content="Blair Nangle | Pics" />
      </Helmet>
      <h1>Pics</h1>
      {years.length > 0 ? (
        <YearList>
          {years.map((year) => (
            <li key={year}>
              <Link to={`/pics/${year}`}>{year}</Link>
            </li>
          ))}
        </YearList>
      ) : (
        <p>No pics yet.</p>
      )}
    </Layout>
  );
}

export default PicsPage;

export const query = graphql`
  query PicsPage {
    allDirectory(filter: { sourceInstanceName: { eq: "pics" } }) {
      nodes {
        relativePath
      }
    }
  }
`;
