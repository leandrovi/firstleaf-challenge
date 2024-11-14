import React from "react";
import { graphql, HeadFC, Link } from "gatsby";
import {
  Globe2,
  Landmark,
  Clock,
  Languages,
  Coins,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import CountriesHeader from "@/components/CountriesHeader";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import worldImage from "../images/world.png";
import type { Country } from "../types/Country";
import SEO from "@/components/Seo";

const CountryTemplate = ({ data }: { data: { country: Country } }) => {
  const [map, setMap] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY as string,
  });

  const country = data.country;

  const mapOptions = {
    styles: [
      { elementType: "geometry", stylers: [{ color: "#222222" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ color: "#746855" }, { weight: 2 }],
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [{ color: "#746855" }, { weight: 1.5 }],
      },
      {
        featureType: "administrative.locality", // Cities
        elementType: "geometry.stroke",
        stylers: [{ color: "#746855" }, { weight: 1 }],
      },
      {
        featureType: "water", // Water boundaries
        elementType: "geometry.stroke",
        stylers: [{ color: "#746855" }, { weight: 1 }],
      },
      {
        featureType: "road.highway", // Major roads
        elementType: "geometry.stroke",
        stylers: [{ color: "#746855" }, { weight: 1 }],
      },
      {
        featureType: "landscape.natural.landcover", // Natural features
        elementType: "geometry.stroke",
        stylers: [{ color: "#746855" }, { weight: 1 }],
      },
    ],
    disableDefaultUI: true, // Removes all default UI controls
    mapTypeControl: false, // Specifically removes the Map/Satellite toggle
    streetViewControl: false, // Removes the street view pegman
    fullscreenControl: false, // Removes the fullscreen button
    zoomControl: false, // Removes the zoom controls
  };

  const onLoadMap = React.useCallback(
    (map: any) => {
      const center = {
        lat: country.latlng[0],
        lng: country.latlng[1],
      };

      // Set center and zoom directly
      map.setCenter(center);
      map.setZoom(5); // Adjust zoom level as needed

      setMap(map);
    },
    [country]
  );

  const onUnmountMap = React.useCallback(() => {
    setMap(null);
  }, []);

  return (
    <main className="dark bg-[#262626] min-h-screen flex flex-col relative w-full text-primary gap-4 pb-8">
      <CountriesHeader />

      <div className="absolute bottom-0 left-0 right-0 top-[30vh]">
        <img
          src={worldImage}
          alt="World"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="xl:container mx-auto w-full px-6 pt-12 pb-20 text-primary z-10">
        <div className="flex flex-col gap-2.5">
          <Button variant="ghost" size="icon" asChild className="px-8">
            <Link to="/countries" className="text-muted-foreground">
              <ArrowLeft size={16} /> Go Back
            </Link>
          </Button>

          <h1 className="text-4xl font-medium tracking-wide">
            {country.name.common}
          </h1>

          <div className="flex items-center">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-8 h-6 mr-3"
            />
            <p className="font-thin tracking-wide">
              Native name:{" "}
              <span className="text-muted-foreground">
                {country.name.nativeName[0] && country.name.nativeName[0].common
                  ? country.name.nativeName[0].common
                  : ""}
              </span>
            </p>
          </div>
        </div>
      </div>

      <section
        className="xl:container mx-auto w-full px-6 py-12 text-primary z-10 flex flex-col md:flex-row justify-between gap-8"
        style={{ gap: "32px" }}
      >
        <div className="w-full md:max-w-[600px] flex flex-col gap-4 bg-[rgba(26,26,26,0.65)] rounded-2xl border border-[rgba(255,255,255,0.15)] shadow-custom backdrop-blur-[30px] p-8">
          <div className="flex flex-row justify-between items-center gap-4">
            <h2 className="text-lg tracking-wide text-muted-foreground">
              General Statistics
            </h2>

            <div className="border bo rounded-lg py-2 px-4 text-sm font-thin tracking-wide">
              {country.region}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-baseline gap-2">
            <p className="text-5xl font-semibold">
              {country.population.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-sm">is their population</p>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center w-fit">
              <Landmark size={16} className="text-muted-foreground shrink-0" />
              <p className="text-muted-foreground text-sm whitespace-nowrap">
                Capital:
              </p>
              <p className="font-thin truncate">
                {country.capital?.join(", ") || "N/A"}
              </p>
            </div>

            <div className="flex flex-row gap-2 items-center w-fit">
              <Languages size={16} className="text-muted-foreground shrink-0" />
              <p className="text-muted-foreground text-sm whitespace-nowrap">
                Languages:
              </p>
              <p className="font-thin truncate">
                {country.languages.map((lang) => lang.name).join(", ")}
              </p>
            </div>

            <div className="flex flex-row gap-2 items-center w-fit">
              <Coins size={16} className="text-muted-foreground shrink-0" />
              <p className="text-muted-foreground text-sm whitespace-nowrap">
                Currencies:
              </p>
              <p className="font-thin truncate">
                {country.currencies
                  .map((curr) => `${curr.name} (${curr.symbol})`)
                  .join(", ")}
              </p>
            </div>

            <div className="flex flex-row gap-2 items-center w-fit">
              <Clock size={16} className="text-muted-foreground shrink-0" />
              <p className="text-muted-foreground text-sm whitespace-nowrap">
                Timezones:
              </p>
              <p className="font-thin truncate">
                {country.timezones.join(", ")}
              </p>
            </div>

            <div className="flex flex-row gap-2 items-center w-fit">
              <Globe2 size={16} className="text-muted-foreground shrink-0" />
              <p className="text-muted-foreground text-sm whitespace-nowrap">
                Area:
              </p>
              <p className="font-thin truncate">
                {country.area.toLocaleString()} km²
              </p>
            </div>

            <div className="flex flex-row gap-2 items-center w-fit">
              <Lock size={16} className="text-muted-foreground shrink-0" />
              <p className="text-muted-foreground text-sm whitespace-nowrap">
                Independent:
              </p>
              <p className="font-thin truncate">
                {country.independent ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 rounded-2xl border border-[rgba(255,255,255,0.15)] shadow-custom backdrop-blur-[30px] p-8 h-[400px]">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "320px",
                borderRadius: "1rem",
                border: "none",
              }}
              center={{
                lat: country.latlng[0],
                lng: country.latlng[1],
              }}
              zoom={5}
              options={mapOptions}
              onLoad={onLoadMap}
              onUnmount={onUnmountMap}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export const query = graphql`
  query ($id: String!) {
    country(id: { eq: $id }) {
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
`;

export default CountryTemplate;

export const Head: HeadFC = () => <SEO />;
