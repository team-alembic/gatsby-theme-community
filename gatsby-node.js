const Fs = require("fs")
const crypto = require("crypto");

exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "data"
  if (!Fs.existsSync(contentPath)) {
    console.info(`creating the ${contentPath} directory`)
    Fs.mkdirSync(contentPath)
  }
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  getFields,
  createNodeId
}) => {
  const {
    createNodeField,
    createNode,
    createParentChildLink
  } = actions;
  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node;
    const parent = getNode(node.parent);
    if ( parent.internal.type === "File" ) {
      const type = parent.sourceInstanceName;
      createNode({
        ...frontmatter,
        id: createNodeId(`${node.id} >>> ${type}`),
        parent: node.id,
        children: [],
        internal: {
          type: type,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(frontmatter))
            .digest(`hex`),
          content: JSON.stringify(frontmatter)
        }
      });
      createParentChildLink({
        parent: parent,
        child: node
      });
    }
  }
};
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    `type MemberYaml implements Node @dontinfer {
      id: ID!
      parent: Node!
      children: [Node!]!
      internal: Internal!
      name: String!
      avatarUrl: String!
      meetupUrl: String
      websiteUrl: String
      twitter: String
      company: String
      companyUrl: String
    }`,
    `type SponsorYaml implements Node @dontinfer {
      id: ID!
      parent: Node!
      children: [Node!]!
      internal: Internal!
      name: String!
      websiteUrl: String!
      logoUrl: String!
      twitter: String
    }`,
    `type LocationYaml implements Node @dontinfer {
      id: ID!
      parent: Node!
      children: [Node!]!
      internal: Internal!
      name: String!
      mapUrl: String!
      address: String!
      instructions: String
      streetAddress: String
      city: String
      latitude: String
      longitude: String
    }`,
    `type SiteYaml implements Node @dontinfer {
      title: String
      nextEventLine: String
      aboutTitle: String
      organisersTitle: String
      sponsorsTitle: String
      footer: Footer
      iconButton: IconButton
      talks: TalksComponent
      headerNav: [Link]
      defaultImage: String
      description: String
      siteUrl: String
      heroEvent: HeroEvent
      paginationButtons: PaginationButtons
      location: LocationYaml @link
    }`,
    `type PaginationButtons {
      previous: String
      next: String
    }`,
    `type HeroEvent {
      subHeading1: String
      subHeading2: String
    }`,
    `type Footer {
      message1: String!
      message2: String
      copyright: String
      iconType: String
      iconKeyword1: String
      iconLink1: String
      iconKeyword2: String
      iconLink2: String
      iconKeyword3: String
      iconLink3: String
    }`,
    `type IconButton {
      buttonHref: String!
      buttonText: String
      buttonImage: String
      buttonIconName: String
      buttonIconPrefix: String
    }`,
    `type TalksComponent {
      title: String!
      email: String!
      line1: String!
      line2: String
    }`,
    `type Link {
      description: String
      href: String
    }`,
    schema.buildObjectType({
      name: `PageMdx`,
      fields: {
        id: { type: `ID!` },
        title: { type: "String!" },
        path: { type: "String!" },
        body: {
          type: "String!",
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent
            });
            const resolver = type.getFields()["body"].resolve;
            return resolver(mdxNode, {}, context, {
              fieldName: "body"
            });
          }
        },
      },
      interfaces: [`Node`]
    }),
    schema.buildObjectType({
      name: `EventMdx`,
      fields: {
        id: { type: `ID!` },
        title: { type: "String!" },
        path: { type: "String!" },
        body: {
          type: "String!",
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent
            });
            const resolver = type.getFields()["body"].resolve;
            return resolver(mdxNode, {}, context, {
              fieldName: "body"
            });
          },
        },
        date: {
          type: "Date",
          extensions: {
            dateformat: {formatString: "DD-MM-YYYY"},
          },
        },
        time: { type: "String" },
        description: { type: "String" },
        mainImage: { type: "File" },
        images: { type: `[File!]` },
        talks: { type: `[Talk!]` },
        sponsors: { type: `[SponsorYaml!]`,
                    extensions: { link: {} }
                  },
        organisers: { type: `[MemberYaml!]`,
                      extensions: { link: {} }
                    },
        location: { type: "LocationYaml",
                    extensions: { link: {} }
                  },
      },
      interfaces: [`Node`]
    }),
    `type Talk {
      speaker: MemberYaml! @link
      title: String
      description: String
      photos: String
      slides: String
      video: String
    }`
  ];
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions;
  const result = await graphql(`{
  events: allEventMdx(sort: {fields: date, order: DESC}) {
    edges {
      node {
        id
        path
        title
      }
    }
  }
  pages: allPageMdx {
    edges {
      node {
        id
        path
        title
      }
    }
  }
}`
                              );

  if(result.errors) {
    console.error("Check your schema or your content");
    return;
  }

  const pages = result.data.pages.edges;
  pages.forEach(async (page, index) => {
    const {path, title} = page.node;
    if(path && title){
      const component = require.resolve(`./src/templates/plain_mdx.tsx`);
      const context = {
        id: page.node.id
      };
      createPage({path, component, context});
    } else {
      console.error(`Mdx invalid \n\tfile: ${page.title} (check if mdx has title and path)`)
    }
  });

  const events = result.data.events.edges;
  events.forEach(async (event, index) => {
    const {path, title} = event.node;
    if(path && title){
      const component = require.resolve(`./src/templates/event.tsx`);
      // Set next and previous for events
      const previous = index === 0 ? null : events[index - 1].node.path;
      const next =
            index === events.length - 1 ? null : events[index + 1].node.path;
      const context = {
        id: event.node.id,
        previous,
        next
      };

      createPage({path, component, context});
    } else {
      console.error(`Event mdx invalid \n\tfile: ${event.title} (check if mdx has title and path)`)
    }
  });
};
