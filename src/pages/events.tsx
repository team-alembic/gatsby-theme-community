/** @jsx jsx */

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faMeetup, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Box, Container, Flex, jsx, Styled } from "theme-ui";
import { EventCard, Head, PageLayout } from "../components";

library.add(faMeetup, faChevronRight, faTwitter, faGithub);

import { useEvents } from "../hooks";
import { Event } from "../types";

const Events = () => {
  const { allEventMdx, siteYaml, defaultThumbnail } = useEvents();

  return (
    <Head page="Events">
      <PageLayout page="Events">
        <Container sx={{ marginTop: "60px" }}>
          <Styled.h1
            sx={{
              marginX: [5, 5, 5],
              marginY: [5, 5, 5],
              textAlign: "center",
              fontWeight: "body"
            }}
          >
            {siteYaml.eventsTitle}
          </Styled.h1>
          <Flex
            sx={{
              flexWrap: ["nowrap", "wrap", "wrap"],
              flexDirection: ["column", "column", "row"],
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {allEventMdx.edges.map((event: Event, index: number) => {
              const node = event.node;
              const image = event.node.mainImage
                ? event.node.mainImage.childImageSharp.fluid.src
                : defaultThumbnail.publicURL;
              if (event.node.path === "/") {
                return undefined;
              }

              return (
                <Box key={index} sx={{ padding: 4 }}>
                  <EventCard
                    title={node.title}
                    date={node.date}
                    description={node.description}
                    slug={node.path}
                    body={node.body}
                    image={image}
                  />
                </Box>
              );
            })}
          </Flex>
        </Container>
      </PageLayout>
    </Head>
  );
};
export default Events;
