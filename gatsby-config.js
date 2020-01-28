module.exports = ({contentPath, meetupGroup, webFontOpts}) => ({
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-transformer-yaml",
    "gatsby-plugin-mdx",
    "gatsby-plugin-theme-ui",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    "gatsby-plugin-theme-ui",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${contentPath}/assets`,
        name: `Asset`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${contentPath}/events`,
        name: `EventMdx`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${contentPath}/pages`,
        name: `PageMdx`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${contentPath}/ymls`,
        name: `Yml`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alembic Theme`,
        start_url: `/`,
        icon: `${contentPath}/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: webFontOpts
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        groupUrlName: meetupGroup,
        eventsOptions: [{
          fields: `event_hosts`
        }]
      }
    }
  ]
});
