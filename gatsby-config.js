const pixrem = require('pixrem')
const autoprefixer = require('autoprefixer')

module.exports = {
  siteMetadata: {
    title: 'Learn Improv Online',
    siteUrl: 'https://www.learnimpovonline.com',
    description:
      'Free improv warm-ups and exercises with high-quality written descriptions, animated instructionals, and video examples. Start learning now!',
    keywords: 'improv, learn improv, learn improv online',
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'svgo',
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [
          pixrem(),
          autoprefixer({
            browsers: ['last 2 versions'],
          }),
        ],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'activities',
        path: `${__dirname}/src/data/activities`,
      },
    },
    {
      resolve: '@andrew-codes/gatsby-plugin-elasticlunr-search',
      options: {
        // Fields to index
        fields: [
          'title',
          'type',
          'focus',
          'description',
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            type: node => node.frontmatter.type,
            focus: node => node.frontmatter.foci,
            description: node => node.rawMarkdownBody,
            slug: node => node.fields.slug,
          },
        },
      },
    },
  ],
}
