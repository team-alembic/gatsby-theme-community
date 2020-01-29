import { graphql, useStaticQuery } from "gatsby";
export const useEvents = () => {
  return useStaticQuery(graphql`
    {
      allEventMdx(sort: { order: DESC, fields: date }) {
        edges {
          node {
            body
            title
            path
            date(formatString: "MMMM YYYY")
            description
            mainImage {
              publicURL
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
      siteYaml {
        eventsTitle
      }
      defaultThumbnail: file(
        sourceInstanceName: { eq: "Asset" }
        relativePath: { regex: "/default_event_thumbnail.(svg|png|jpg|jpeg)/" }
      ) {
        publicURL
      }
    }
  `);
};
