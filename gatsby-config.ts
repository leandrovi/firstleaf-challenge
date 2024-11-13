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
        prodKey: "zrHeASQ3uXHPAld7h8HFVPSYJh44YsGs",
        devKey: "zrHeASQ3uXHPAld7h8HFVPSYJh44YsGs",
      },
    },
  ],
};

export default config;
