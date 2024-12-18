module.exports = {
  trailingSlash: 'never',
  plugins: [
    {
      resolve: 'gatsby-plugin-styled-components',
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 400,
              quality: 100,
              withWebp: true,
            },
          },
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
            resolve: 'gatsby-remark-autolink-headers',
          },
          {
            resolve: 'gatsby-remark-prismjs',
          },
          {
            resolve: 'gatsby-remark-smartypants',
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              ignoreFileExtensions: [],
            },
          },
          {
            resolve: 'gatsby-plugin-disqus',
            options: {
              shortname: 'blairnangle-dot-com',
            },
          },
        ],
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
        defaultLayouts: {
          default: require.resolve('./src/components/Layout.jsx'),
        },
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-autolink-headers' },
          { resolve: 'gatsby-remark-prismjs', options: {} },
          { resolve: 'gatsby-remark-smartypants' },
          {
            resolve: 'gatsby-remark-images',
          },
        ],
        plugins: ['gatsby-remark-images', 'gatsby-plugin-sharp'],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-124521773-1',
      },
    },
  ],
};
