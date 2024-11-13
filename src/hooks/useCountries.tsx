import { Country } from "@/types/Country";
import { useInfiniteQuery } from "react-query";

export interface CountriesResponse {
  allCountry: {
    nodes: Country[];
    pageInfo: {
      totalCount: number;
      hasNextPage: boolean;
    };
  };
}

const fetchCountries = async ({ pageParam = 1 }) => {
  const limit = 20;
  const response = await fetch(`/___graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetCountries($limit: Int!, $skip: Int!) {
          allCountry(limit: $limit, skip: $skip) {
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
              totalCount
              hasNextPage
            }
          }
        }
      `,
      variables: {
        limit,
        skip: (pageParam - 1) * limit,
      },
    }),
  });

  const { data } = await response.json();
  return data as CountriesResponse;
};

export const useCountries = (initialData: CountriesResponse) => {
  return useInfiniteQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    getNextPageParam: (lastPage, pages) =>
      lastPage.allCountry.pageInfo.hasNextPage ? pages.length + 1 : undefined,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  });
};
