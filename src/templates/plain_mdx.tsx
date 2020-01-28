/** @jsx jsx */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faMeetup, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { graphql } from "gatsby";
import React from "react";
import { Container, Flex, jsx } from "theme-ui";
import { Head, PageLayout } from "../components";

library.add(faMeetup, faTwitter, faGithub);

import { MDXRenderer } from "gatsby-plugin-mdx";

export default ({
  data: {
    pageMdx: { title, body },
  },
}) => {
  return (
    <Head page={title}>
      <PageLayout page={title}>
        <Container sx={{ marginTop: "60px" }}>
          <Flex
            sx={{
              flexDirection: "column",
              paddingX: 5,
              fontSize: [2, 2, 3],
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </Flex>
        </Container>
      </PageLayout>
    </Head>
  );
};

export const query = graphql`
  query PageMdx($id: String!) {
    pageMdx(id: { eq: $id }) {
      body
      title
    }
  }
`;
