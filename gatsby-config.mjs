import { dirname } from 'path';
import { fileURLToPath } from 'url';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  trailingSlash: 'never',
  plugins: [
    {
      resolve: 'gatsby-plugin-styled-components',
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Blair Nangle',
        short_name: 'Blair Nangle',
        start_url: '/',
        icon: 'static/favicon.ico',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blogPosts',
        path: `${__dirname}/src/content/posts/blog`,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#0000ff',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-5PX1SLEFWG',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-autolink-headers' },
          { resolve: 'gatsby-remark-prismjs', options: {} },
          { resolve: 'gatsby-remark-smartypants' },
          {
            resolve: 'gatsby-remark-images',
          },
        ],
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      },
    },
  ],
};

export default config;
