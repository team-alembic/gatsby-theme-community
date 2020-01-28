/** @jsx jsx */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, useStaticQuery } from "gatsby";
import { useState } from "react";
import { Box, Flex, jsx } from "theme-ui";

export interface SlideShowProps {
  imageUrls: ImageUrlProps[];
}

interface ImageUrlProps {
  publicURL: string;
  childImageSharp: ChildImageSharpProps;
}

interface ChildImageSharpProps {
  fluid: FluidProps;
}

interface FluidProps {
  src: string;
}

export const SlideShow = ({ imageUrls }: SlideShowProps) => {
  const { siteYaml } = useStaticQuery(graphql`
    {
      siteYaml {
        defaultImage
        siteUrl
      }
    }
  `);

  const [index, setIndex] = useState(0);
  const images =
    imageUrls === null
      ? [siteYaml.defaultImage]
      : imageUrls.map((image: any) => image.childImageSharp.fluid.src);

  const handleNext = () => {
    index === images.length - 1 ? setIndex(0) : setIndex(index + 1);
  };
  const handlePrevious = () => {
    index === 0 ? setIndex(images.length) : setIndex(index - 1);
  };
  const showPrevious = index === 0 ? "hidden" : "inline-block";
  const showNext = index === images.length - 1 ? "hidden" : "inline-block";

  return (
    <Flex
      sx={{
        paddingX: [4, 4, 10],
        paddingY: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box onClick={handlePrevious} sx={{ cursor: "pointer", visibility: showPrevious }}>
        <FontAwesomeIcon
          icon={["fas", "chevron-left"]}
          css={{ color: "rgb(33,16,75)", fontSize: 50, paddingRight: 10 }}
        />
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${images[index]})`,
          height: [200, 400, 400],
          width: "80%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box onClick={handleNext} sx={{ cursor: "pointer", visibility: showNext }}>
        <FontAwesomeIcon
          icon={["fas", "chevron-right"]}
          css={{ color: "rgb(33,16,75)", fontSize: 50, paddingLeft: 10 }}
        />
      </Box>
    </Flex>
  );
};
