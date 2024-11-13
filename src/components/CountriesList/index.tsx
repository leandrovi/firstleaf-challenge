import React from "react";
import { Link } from "gatsby";
import { FixedSizeList } from "react-window";

import { useViewportHeight } from "@/hooks/useViewportHeight";
import { CountriesResponse, useCountries } from "@/hooks/useCountries";
import { Country } from "@/types/Country";
import { Separator } from "../ui/separator";

const Row = React.memo(
  ({
    index,
    style,
    data,
  }: {
    index: number;
    style: React.CSSProperties;
    data: Country[];
  }) => {
    if (!data) return null;

    if (index === data.length) {
      return (
        <div
          key="end"
          style={style}
          className="flex items-center justify-center p-4"
        >
          <span>Hooray, you reached the end!</span>
        </div>
      );
    }

    const country = data[index];
    if (!country) return null;

    return (
      <Link key={country.cca3} to={`/countries/${country.slug}`} style={style}>
        <div className="flex items-center h-[65px] hover:bg-muted transition-all px-8">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-8 h-6 mr-3"
          />
          <p className="font-normal">{country.name.common}</p>
        </div>
      </Link>
    );
  }
);

interface CountriesListProps {
  initialData: CountriesResponse;
}

export default function CountriesList({ initialData }: CountriesListProps) {
  const viewportHeight = useViewportHeight();
  const {
    data: queryData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useCountries(initialData);

  const countries = queryData?.pages.flatMap((page) => page.allCountry.nodes);

  if (!countries || viewportHeight === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="px-8 flex flex-col items-start">
        <h3 className="font-thin mb-4">List of Countries</h3>

        <div className="flex items-baseline gap-1">
          <span className="text-5xl">250</span>
          <p className="text-sm text-muted-foreground pb-2">countries total</p>
        </div>
        <Separator className="mt-4 bg-primary/20" />
      </div>

      <FixedSizeList
        height={400}
        width="100%"
        itemCount={countries.length + 1}
        itemSize={65}
        onItemsRendered={({ visibleStopIndex }) => {
          if (
            visibleStopIndex >= countries.length - 10 &&
            hasNextPage &&
            !isFetching
          ) {
            fetchNextPage();
          }
        }}
        overscanCount={5}
        useIsScrolling
        itemData={countries}
      >
        {Row}
      </FixedSizeList>
    </>
  );
}
