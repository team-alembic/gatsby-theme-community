/** @jsx jsx */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Box, Flex, jsx, Styled } from "theme-ui";

export interface PaginationButtonsProps {
  next?: string;
  previous?: string;
}

export const PaginationButtons = ({ next, previous }: PaginationButtonsProps) => {
  const { siteYaml } = useStaticQuery(graphql`
    {
      siteYaml {
        paginationButtons {
          previous
          next
        }
      }
    }
  `);
  const displayPrevious = previous === null ? "none" : "inline-block";
  const previousPath = previous === null ? "none" : previous;
  const displayNext = next === null ? "none" : "inline-block";
  const nextPath = next === null ? "none" : next;

  return (
    <Flex sx={{ justifyContent: "space-between" }}>
      <Link
        sx={{
          justifyContent: "flex-start",
          display: "inline-block",
          variant: "linkStyles.buttonDefault",
          color: "text"
        }}
        to={previousPath}
      >
        <Box sx={{ display: displayPrevious }}>
          <Styled.p
            sx={{
              fontSize: 4,
              alignItems: "center",
              display: "flex"
            }}
          >
            <FontAwesomeIcon
              icon={["fas", "chevron-left"]}
              css={{ color: "#ff9900", fontSize: 40 }}
            />
            {siteYaml.paginationButtons.previous}
          </Styled.p>
        </Box>
      </Link>
      <Link
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          display: displayNext,
          variant: "linkStyles.buttonDefault",
          color: "text"
        }}
        to={nextPath}
      >
        <Styled.p
          sx={{
            fontSize: 4,
            alignItems: "center",
            display: "flex"
          }}
        >
          {siteYaml.paginationButtons.next}
          <FontAwesomeIcon
            icon={["fas", "chevron-right"]}
            css={{ color: "#ff9900", fontSize: 40 }}
          />
        </Styled.p>
      </Link>
    </Flex>
  );
};
