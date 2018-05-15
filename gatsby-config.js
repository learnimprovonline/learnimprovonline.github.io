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
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Learn Improv Online',
        short_name: 'LIO',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'standalone',
        icons: [
          {
            src: '/logos/logo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logos/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'activities',
        path: `${__dirname}/content/activity/activities`,
      },
    },
  ],
}
