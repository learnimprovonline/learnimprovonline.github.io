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
        display: "minimal-ui"
      },
    },
    "gatsby-plugin-offline",
  ],
}
