# Gatsby Theme Community
This repo contains a [Gatsby](https://www.gatsbyjs.org/) theme focused on IT communities.

# Install
```
yarn install
```

# Linter
That repo is using [TSLint](https://palantir.github.io/tslint/) into the CI and [Prettier](https://prettier.io/) into the IDE
`tslint.json` and `tsconfig.json` are used for `TSLint` and `.prettierrc` for `Prettier`

# Custom the Gatsby Theme Community
To know more about how Gatsby Theme works, see [Building Themes](https://www.gatsbyjs.org/docs/themes/building-themes/)

# Create new community website
Start new nodejs project
```
yarn init new_community
```

Add deps
```
yarn add gatsby gatsby-theme-community react react-dom
```

Add scripts to your project
```
# At package.json add
"scripts": {
  "build": "gatsby build",
  "develop": "gatsby develop",
  "clean": "gatsby clean"
},
```

Clone default `content` to your project
```
cp gatsby-theme-community/data new_community/content
```

Add `gatsby-config.js`
```
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-community",
      options: {
        contentPath: "content",
        webFontOpts: {
          google: {
            families: ["CUSTOM_WEB_FONT"]
          }
        }
      },
    }
  ]
};

```

Run the project
```
yarn develop
```

# Change content
All data is been into `content` folder:
- `assets` images used by the theme
- `events` mdx render by `gatsby-theme-community/src/templates/event.tsx`
- `pages` mdx render by `gatsby-theme-community/src/templates/plain_mdx.tsx`
- `yml` yaml contains all data used by the theme

## Event structure
Add new mdx file at `content/events`
```
---
path: /events/new_event
title: New Event
date: 2020-01-01
time: 6:00 - 8:00pm
location: alembic_company # Linked with content/yml/location.yaml
organisers:
  - alembic_dev # Linked with content/yml/member.yaml
sponsors:
  - alembic_sponsor # Linked with content/yml/sponsor.yaml
talks:
  - speaker: alembic_dev # Linked with content/yml/member.yaml
    title: Event 0
    description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sapien.
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a rhoncus sem. Nulla ipsum eros.
mainImage: ./event.jpeg
images: [./event.jpeg, ./event_more_one.jpg]
startDate: 2018-12-06T18:00+11:00
endDate: 2018-12-06T20:30+11:00
---
Description MDX
```

## Page Structure
Add new mdx file at `content/pages`
```
---
path: /page
title: Page
---

Content MDX
```
