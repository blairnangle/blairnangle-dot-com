import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Layout from '../components/Layout';
import JustifiedGallery from '../components/JustifiedGallery';

const EmptyState = styled.p`
  color: ${({ theme }) => theme.muted};
`;

function PicYearTemplate({ data, pageContext }) {
  const { year } = pageContext;
  const photos = data.allFile.nodes;

  return (
    <Layout>
      <Helmet>
        <title>{`Blair Nangle | Pics | ${year}`}</title>
        <meta property="og:title" content={`Blair Nangle | Pics | ${year}`} />
      </Helmet>
      <h1>{year}</h1>
      {photos.length > 0 ? (
        <JustifiedGallery photos={photos} />
      ) : (
        <EmptyState>No pics yet.</EmptyState>
      )}
    </Layout>
  );
}

export default PicYearTemplate;

export const query = graphql`
  query PicYear($year: String!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "pics" }
        relativeDirectory: { eq: $year }
        extension: { in: ["jpg", "jpeg", "png", "webp", "avif"] }
      }
      sort: { name: ASC }
    ) {
      nodes {
        name
        relativePath
        publicURL
      }
    }
  }
`;
