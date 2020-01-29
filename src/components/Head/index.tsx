import { graphql, useStaticQuery } from "gatsby";
import React, { ReactNode } from "react";
import Helmet from "react-helmet";
import { SiteYaml } from "../../types";

interface HeadProps {
  seo?: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
  page: string;
  children: ReactNode;
}

export const Head = ({ children, page, seo }: HeadProps) => {
  const data = useStaticQuery(graphql`
    query {
      siteYaml {
        title
        defaultImage
        description
        siteUrl
        location {
          name
          streetAddress
          city
          latitude
          longitude
        }
      }
    }
  `);
  const { title, defaultImage, description, siteUrl, location }: SiteYaml = data.siteYaml;
  const { name, streetAddress, city, latitude, longitude } = location;

  if (!seo) {
    seo = {
      title: title,
      description: description,
      url: siteUrl,
      image: defaultImage
    };
  }

  return (
    <div>
      <Helmet defaultTitle={title} titleTemplate={`${title} | %s`}>
        >
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#1B1B38" />
        <link rel="canonical" href={seo.url} />
        <meta name="description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.url} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={seo.image} />
        <title>{page}</title>
        <script type="application/ld+json">
          {`{
        "@context": "http://schema.org",
        "@type": "Event",
        "name": ${seo.title},
        "url": ${seo.url},
        "description": ${seo.description},
        "location": {
          "@type": "Place",
          "name": ${name},
          "address": {
            "@type": "PostalAddress",
            "streetAddress": ${streetAddress},
            "addressLocality": ${city},
            "addressCountry": "Australia"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${latitude},
            "longitude": ${longitude}
          }
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "organizer": {
          "@type": "Organization",
          "name": ${title},
          "url": ${siteUrl}
          }
        }`}
        </script>
      </Helmet>
      {children}
    </div>
  );
};
