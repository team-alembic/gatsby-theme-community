export interface Event {
  node: {
    frontmatter: {
      title: string;
      date: string;
      path: string;
      description: string;
      mainImage: {
        publicURL: string;
        childImageSharp: {
          fluid: {
            src: string;
          };
        };
      };
    };
    body: string;
  };
}
