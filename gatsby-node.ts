import { Actions, GatsbyNode } from "gatsby";
import * as path from "path";
import type { Country } from "./src/types/Country";
import slugify from "slugify";

export const onCreateWebpackConfig = ({ actions }: { actions: Actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/images": path.resolve(__dirname, "src/images"),
      },
    },
  });
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  countries.forEach((country) => {
    const languagesArray = Object.entries(country.languages || {}).map(
      ([code, name]) => ({
        code,
        name,
      })
    );

    const currenciesArray = Object.entries(country.currencies || {}).map(
      ([code, currency]) => ({
        code,
        name: currency.name,
        symbol: currency.symbol,
      })
    );

    const nativeNamesArray = Object.entries(country.name.nativeName || {}).map(
      ([code, names]) => ({
        code,
        official: names.official,
        common: names.common,
      })
    );

    const countryWithSlug = {
      ...country,
      name: {
        ...country.name,
        nativeName: nativeNamesArray,
      },
      languages: languagesArray,
      currencies: currenciesArray,
      slug: slugify(country.name.common, { lower: true, strict: true }),
    };

    const nodeContent = JSON.stringify(countryWithSlug);
    const nodeMeta = {
      id: createNodeId(country.cca3),
      parent: null,
      children: [],
      internal: {
        type: "Country",
        mediaType: "application/json",
        content: nodeContent,
        contentDigest: createContentDigest(countryWithSlug),
      },
    };

    const node = Object.assign({}, countryWithSlug, nodeMeta) as any;
    createNode(node);
  });
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const result = await graphql<{
    allCountry: {
      nodes: Array<{
        slug: string;
        id: string;
      }>;
    };
  }>(`
    query {
      allCountry {
        nodes {
          slug
          id
          name {
            common
            official
            nativeName {
              code
              official
              common
            }
          }
          languages {
            code
            name
          }
          capital
          region
          population
          flag
          flags {
            png
            svg
            alt
          }
          cca3
          latlng
          area
          timezones
          status
          independent
          currencies {
            code
            name
            symbol
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const countryTemplate = path.resolve("./src/templates/country-template.tsx");

  result.data?.allCountry.nodes.forEach((country) => {
    createPage({
      path: `/countries/${country.slug}`,
      component: countryTemplate,
      context: {
        id: country.id,
      },
    });
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
    type Country implements Node {
      id: ID!
      slug: String!
      name: CountryName!
      languages: [Language!]!
      currencies: [Currency!]!
      capital: [String]
      region: String
      population: Int
      flag: String
      flags: Flags!
      cca3: String!
      latlng: [Float]
      area: Float
      timezones: [String]
      status: String
      independent: Boolean
    }

    type CountryName {
      common: String!
      official: String!
      nativeName: [NativeName!]!
    }

    type NativeName {
      code: String!
      official: String!
      common: String!
    }

    type Language {
      code: String!
      name: String!
    }

    type Currency {
      code: String!
      name: String!
      symbol: String
    }

    type Flags {
      png: String!
      svg: String!
      alt: String
    }

    type PageInfo {
      totalCount: Int!
      hasNextPage: Boolean!
    }

    type CountryConnection {
      nodes: [Country!]!
      pageInfo: PageInfo!
    }
  `);
  };
