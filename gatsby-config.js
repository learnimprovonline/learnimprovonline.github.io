module.exports = {
  siteMetadata: {
    title: "Learn Improv Online",
    siteUrl: "https://www.learnimpovonline.com"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",    
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Learn Improv Online",
        short_name: "LIO",
        start_url: "/",
        background_color: "#f7f0eb",
        theme_color: "#a2466c",
        display: "standalone",
        icons: [
          {
            src: "/logos/logo-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logos/logo-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
    },
    "gatsby-plugin-offline",
  ],
}
