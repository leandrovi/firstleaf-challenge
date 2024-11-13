import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Firstleaf Challenge`,
    description: `Frontend project for the Firstleaf challenge`,
    siteUrl: `https://firstleaf-leandro.netlify.app`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        prodKey: process.env.SEGMENT_PROD_KEY as string,
        devKey: process.env.SEGMENT_DEV_KEY as string,
      },
    },
    {
      resolve: "@sentry/gatsby",
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: "",
        sampleRate: 0.7,
        environment: process.env.NODE_ENV,
        enabled: !!process.env.SENTRY_DSN,
        tracesSampleRate: 1.0,
      },
    },
  ],
};

export default config;
