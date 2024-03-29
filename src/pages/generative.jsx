import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import BlogListing from '../components/BlogListing';
import XA from '../components/ExternalAnchor';

function GenerativePageInner(props) {
  try {
    const posts = props.data.allMdx ? props.data.allMdx.edges : [];

    return <BlogListing posts={posts} />;
  } catch (e) {
    return <h2>Unable to find any blog posts.</h2>;
  }
}

function GenerativePage(props) {
  return (
    <Layout>
      <div>
        <p>
          Experiments with generative AI. Prompt engineering.
          Something to do with posterity. Or, more likely, just a
          {' '}
          <XA href="https://waitbutwhy.com/2013/10/why-procrastinators-procrastinate.html">dark playground</XA>
          {' '}
          to keep me from doing actual ML work.
        </p>
        <p>
          The posts wear content from various large language models
          (prompts: author&apos;s own), etc.
        </p>
      </div>
      <GenerativePageInner {...props} />
    </Layout>
  );
}

export default GenerativePage;

export const query = graphql`
  query {
    allMdx(
      filter: {
        frontmatter: {
          publish: {
            eq: true
           },
          postType: {
            eq: "generative"
          }
        }
      }
      sort: {
        fields: [frontmatter___date], order: DESC
      }
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
