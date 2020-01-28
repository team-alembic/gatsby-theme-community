/** @jsx jsx */

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faMeetup, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Box, Container, Flex, jsx, Styled } from "theme-ui";
import {
  Head,
  OrganisersRow,
  PageLayout,
  PaginationButtons,
  SlideShow,
  SponsorsGroup,
  TalksList,
} from "../components";

library.add(faMeetup, faTwitter, faGithub, faChevronRight, faChevronLeft);

export default ({ data: { siteYaml, eventMdx }, pageContext: { next, previous } }: any) => {
  const mainImage = eventMdx.mainImage
    ? eventMdx.mainImage.childImageSharp.fluid.src
    : siteYaml.defaultImage;
  const urlEvent = siteYaml.siteUrl + eventMdx.path;

  const seo = {
    title: eventMdx.title,
    descrition: eventMdx.description,
    url: eventMdx.urlEvent,
    image: eventMdx.mainImage,
  };

  return (
    <Head page="Event">
      <PageLayout page="Events" seo={seo}>
        <Container sx={{ marginTop: 70 }}>
          <PaginationButtons next={next} previous={previous} />
          {eventMdx.images && <SlideShow imageUrls={eventMdx.images} />}
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Styled.h1
              sx={{
                marginY: 6,
              }}
            >
              {eventMdx.title}
            </Styled.h1>
            <Flex
              sx={{
                flexDirection: "column",
                width: ["100%", "68%", "68%"],
              }}
            >
              <Styled.h4 sx={{ marginTop: 3 }}>{eventMdx.date}</Styled.h4>
              <MDXRenderer>{eventMdx.body}</MDXRenderer>
            </Flex>
          </Flex>
        </Container>
        <TalksList talks={eventMdx.talks} />
        <Box sx={{ marginTop: 5 }}>
          <SponsorsGroup sponsors={eventMdx.sponsors} sponsorsTitle={siteYaml.sponsorsTitle} />
          <OrganisersRow people={eventMdx.organisers} organisersTitle={siteYaml.organisersTitle} />
        </Box>
      </PageLayout>
    </Head>
  );
};

export const query = graphql`
  query EventMdx($id: String!) {
    siteYaml {
      siteUrl
      defaultImage
      sponsorsTitle
      organisersTitle
    }
    eventMdx(id: { eq: $id }) {
      id
      body
      path
      date
      title
      description
      location {
        name
        mapUrl
        address
        instructions
        streetAddress
        city
        latitude
        longitude
      }
      mainImage {
        publicURL
        childImageSharp {
          fluid {
            src
          }
        }
      }
      images {
        publicURL
        childImageSharp {
          fluid {
            src
          }
        }
      }
      organisers {
        name
        avatarUrl
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
`;
