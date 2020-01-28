import { graphql, useStaticQuery } from "gatsby";
export const useHome = () => {
  return useStaticQuery(graphql`
    {
      siteYaml {
        organisersTitle
        sponsorsTitle
        pageInformation {
          heading1
          paragraph1
        }
      }
      allEventMdx(sort: { order: DESC, fields: date }, limit: 1) {
        edges {
          node {
            date(formatString: "DD MMMM YYYY")
            time
            title
            body
            location {
              name
              mapUrl
              address
              instructions
            }
            organisers {
              name
              avatarUrl
              company
              companyUrl
            }
            sponsors {
              name
              logoUrl
              websiteUrl
            }
            talks {
              speaker {
                name
                avatarUrl
              }
              title
              description
              photos
              slides
              video
            }
          }
        }
      }
    }
  `);
};
