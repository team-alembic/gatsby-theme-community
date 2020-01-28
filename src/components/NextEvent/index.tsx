/** @jsx jsx */
import { graphql, useStaticQuery } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Container, Flex, jsx, Styled } from "theme-ui";

export interface NextEventProps {
  title: string;
  body: string;
}

export const NextEvent = ({ title, body }: NextEventProps) => {
  const data = useStaticQuery(graphql`
    {
      event: file(
        sourceInstanceName: { eq: "Asset" }
        relativePath: { regex: "/main_event.(svg|png|jpg|jpeg)/" }
      ) {
        publicURL
      }
    }
  `);

  return (
    <Container>
      <Flex
        sx={{
          flexDirection: ["column", "column", "row"],
          margin: 5
        }}
      >
        <Styled.div
          sx={{
            backgroundImage: `url(${data.event.publicURL})`,
            width: ["auto", "auto", "1000px"],
            height: ["500px", "400px", "auto"],
            backgroundSize: "cover",
            borderRadius: "14px",
            marginBottom: "20px"
          }}
        />
        <Flex
          sx={{
            flexDirection: "column",
            width: "100%",
            marginLeft: [0, 0, 40]
          }}
        >
          <Styled.h4
            sx={{
              margin: 1,
              fontWeight: "normal"
            }}
          />
          <Styled.h3
            sx={{
              margin: 1,
              font: "body"
            }}
          >
            {title}
          </Styled.h3>
          <Flex
            sx={{
              flexDirection: "column"
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
