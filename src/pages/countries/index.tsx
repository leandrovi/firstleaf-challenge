import React from "react";
import { graphql, HeadFC } from "gatsby";
import worldImage from "../../images/world.png";

import { CountriesResponse } from "@/hooks/useCountries";
import CountriesList from "@/components/CountriesList";
import CountriesHeader from "@/components/CountriesHeader";
import SEO from "@/components/Seo";

interface CountriesPageProps {
  data: CountriesResponse;
}

const CountriesPage = ({ data }: CountriesPageProps) => {
  return (
    <main className="dark bg-[#262626] h-screen overflow-hidden flex flex-col relative w-full text-primary">
      <CountriesHeader />

      <img
        src={worldImage}
        alt="World"
        className="w-full h-full object-cover object-top absolute bottom-0 left-0 right-0 top-[30vh]"
      />

      <section className="xl:container mx-auto w-full py-8 md:py-20 text-primary z-10 px-6">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-4xl font-medium tracking-wide">
            Countries statistics
          </h1>
          <p className="font-thin tracking-wide">
            Data visualization & analysis of countries around the world
          </p>
        </div>
      </section>

      <section className="mx-6 pt-8 md:w-full max-w-[600px] h-[445px] md:mx-auto z-10 bg-[rgba(26,26,26,0.65)] rounded-2xl border border-[rgba(255,255,255,0.15)] shadow-custom backdrop-blur-[30px]">
        <CountriesList initialData={data} />
      </section>
    </main>
  );
};

export const query = graphql`
  query {
    allCountry(limit: 250) {
      nodes {
        id
        slug
        cca3
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
      pageInfo {
        hasNextPage
        totalCount
      }
    }
  }
`;

export default CountriesPage;

export const Head: HeadFC = () => <SEO />;
