import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import BlogListing from '../components/BlogListing';

function BlogPageInner(props) {
  try {
    const posts = props.data.allMdx ? props.data.allMdx.edges : [];

    return <BlogListing posts={posts} />;
  } catch (e) {
    return <h2>Unable to find any blog posts.</h2>;
  }
}

function BlogPage(props) {
  return (
    <Layout>
      <BlogPageInner {...props} />
    </Layout>
  );
}

export default BlogPage;

export const query = graphql`
  query {
    allMdx(
      filter: {
        frontmatter: {
          publish: {
            eq: true
           }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            excerpt
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
