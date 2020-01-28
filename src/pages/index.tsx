/** @jsx jsx */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faMeetup, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Box, Container, jsx } from "theme-ui";

import {
  Banner,
  Head,
  HeroEventMeetup,
  MapDescription,
  NextEvent,
  OrganisersRow,
  PageInformation,
  PageLayout,
  SponsorsGroup,
  TalksList,
} from "../components";

library.add(faMeetup, faTwitter, faGithub);

import { useHome } from "../hooks";

const Home = () => {
  const data = useHome();
  const event = data.allEventMdx.edges[0].node;
  const { name, address, mapUrl, instructions } = event.location;
  const {
    sponsorsTitle,
    organisersTitle,
    pageInformation: { heading1, paragraph1 },
  } = data.siteYaml;

  return (
    <Head page="Home">
      <PageLayout page="Home">
        <HeroEventMeetup
          heading={event.title}
          date={event.date}
          time={event.time}
          location1={name}
          location2={address}
        />

        <PageInformation heading1={heading1} paragraph1={paragraph1} />

        <NextEvent title={event.title} body={event.body} />

        <TalksList talks={event.talks} />

        <MapDescription address={address} mapUrl={mapUrl} name={name} instructions={instructions} />

        <Banner backgroundImageUrl="https://camunda.com/img/events/meetup-example.jpg" />

        <Container>
          <Box sx={{ marginTop: 5 }}>
            <SponsorsGroup sponsors={event.sponsors} sponsorsTitle={sponsorsTitle} />
            <OrganisersRow people={event.organisers} organisersTitle={organisersTitle} />
          </Box>
        </Container>
      </PageLayout>
    </Head>
  );
};
export default Home;
