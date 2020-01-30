export interface Event {
  node: {
    id: string;
    title: string;
    date: string;
    path: string;
    body: string;
    time: string;
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
}
