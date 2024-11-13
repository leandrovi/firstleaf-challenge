# Countries Site Challenge

Build a static site that generate pages dynamically by sourcing data from an external API

API: https://restcountries.com/v3.1/all

# Instructions
- Use Gatsby's data layer to fetch data from the provided Countries API during build time
- Utilize the `createPages` API in `gatsby-node.js` to generate a page for each country.
- Leverage Gatsby's GraphQL API to efficiently query the country data.
- There should be 1 index page at `/countries` that would list all available countries.
- Generate 1 page per country like so `/countries/{slugified-name}` that will contain the details of each country, pick any additional details.
- There are no styling constraints, this repo comes with scss out of the box, make sure to style as you see fit.
