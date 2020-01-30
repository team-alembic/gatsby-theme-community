/** @jsx jsx */
import { css, Global } from "@emotion/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useState } from "react";
import { Box, Container, jsx, Layout, Styled } from "theme-ui";
import { Footer } from "../Footer";
import { HeaderNav } from "../HeaderNav";

library.add(faCheckSquare, faCoffee);

export interface PageLayoutProps {
  page?: string;
  children: ReactNode;
}

export const PageLayout = ({ page, children }: PageLayoutProps) => {
  const [position, setPosition] = useState("null");

  const togglePageFix = () => {
    position === "null" ? setPosition("fixed") : setPosition("null");

    return position;
  };

  const fixed = {
    position: "fixed",
    maxWidth: "100%",
    padding: "0px",
    zIndex: "100"
  };
  return (
    <Styled.root>
      {/*
          // @ts-ignore: TODO treat using class */}
      <Layout sx={{ position: position, width: "100vw" }}>
        <Global
          styles={css`
            body {
              margin: 0;
            }
          `}
        />

        {/*
            // @ts-ignore: TODO treat using class */}
        <Container sx={fixed}>
          <HeaderNav togglePageFix={togglePageFix} page={page} />
        </Container>
        {children}
        <Box sx={{ flexGrow: 1 }} />
        <Footer />
      </Layout>
    </Styled.root>
  );
};
