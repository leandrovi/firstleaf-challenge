import React from "react";
import { render, screen } from "../../../test/test-utils";
import CountriesList from "./index";
import { CountriesResponse } from "@/hooks/useCountries";

const mockInitialData: CountriesResponse = {
  allCountry: {
    nodes: [
      {
        name: {
          common: "Brazil",
          official: "Federative Republic of Brazil",
          nativeName: [
            {
              code: "por",
              official: "República Federativa do Brasil",
              common: "Brasil",
            },
          ],
        },
        slug: "brazil",
        cca3: "BRA",
        independent: true,
        status: "officially-assigned",
        currencies: [
          {
            code: "BRL",
            name: "Brazilian real",
            symbol: "R$",
          },
        ],
        capital: ["Brasília"],
        region: "Americas",
        languages: [
          {
            code: "POR",
            name: "Portuguese",
          },
        ],
        latlng: [-10, -55],
        area: 8515767,
        flag: "🇧🇷",
        population: 212559409,
        timezones: ["UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00"],
        flags: {
          png: "https://flagcdn.com/w320/br.png",
          svg: "https://flagcdn.com/br.svg",
          alt: "The flag of Brazil has a green field with a large yellow rhombus in the center. Within the rhombus is a dark blue globe with twenty-seven small five-pointed white stars depicting a starry sky and a thin white convex horizontal band inscribed with the national motto 'Ordem e Progresso' across its center.",
        },
      },
      {
        slug: "serbia",
        status: "independent",
        name: {
          common: "Serbia",
          official: "Republic of Serbia",
          nativeName: [
            {
              code: "srp",
              official: "Република Србија",
              common: "Србија",
            },
          ],
        },
        cca3: "SRB",
        independent: true,
        currencies: [
          {
            code: "RSD",
            name: "Serbian dinar",
            symbol: "дин.",
          },
        ],
        capital: ["Belgrade"],
        region: "Europe",
        languages: [
          {
            code: "SRP",
            name: "Serbian",
          },
        ],
        latlng: [44, 21],
        area: 88361,
        flag: "🇷🇸",
        population: 6908224,
        timezones: ["UTC+01:00"],
        flags: {
          png: "https://flagcdn.com/w320/rs.png",
          svg: "https://flagcdn.com/rs.svg",
          alt: "The flag of Serbia is composed of three equal horizontal bands of red, blue and white. The coat of arms of Serbia is superimposed at the center of the field slightly towards the hoist side.",
        },
      },
    ],
    pageInfo: {
      totalCount: 250,
      hasNextPage: false,
    },
  },
};

jest.mock("@/hooks/useViewportHeight", () => ({
  useViewportHeight: () => 800,
}));

jest.mock("@/hooks/useCountries", () => ({
  useCountries: () => ({
    data: {
      pages: [{ allCountry: { nodes: mockInitialData.allCountry.nodes } }],
    },
    isFetching: false,
    fetchNextPage: jest.fn(),
    hasNextPage: false,
  }),
}));

describe("CountriesList", () => {
  test("renders CountriesList component", () => {
    render(<CountriesList initialData={mockInitialData} />);
    expect(screen.getByText("List of Countries")).toBeInTheDocument();
  });

  test("displays total countries count", () => {
    render(<CountriesList initialData={mockInitialData} />);
    expect(screen.getByText("250")).toBeInTheDocument();
    expect(screen.getByText("countries total")).toBeInTheDocument();
  });

  test("renders country items with correct data", () => {
    render(<CountriesList initialData={mockInitialData} />);
    expect(screen.getByText("Brazil")).toBeInTheDocument();
    expect(screen.getByText("Serbia")).toBeInTheDocument();

    const flags = screen.getAllByRole("img");
    expect(flags[0]).toHaveAttribute("src", "https://flagcdn.com/br.svg");
    expect(flags[1]).toHaveAttribute("src", "https://flagcdn.com/rs.svg");
  });

  test("shows end message when scrolled to bottom", () => {
    render(<CountriesList initialData={mockInitialData} />);
    expect(
      screen.getByText("Hooray, you reached the end!")
    ).toBeInTheDocument();
  });

  test("country items are wrapped in links with correct hrefs", () => {
    render(<CountriesList initialData={mockInitialData} />);

    const brazilLink = screen.getByRole("link", { name: /Brazil/i });
    const usaLink = screen.getByRole("link", { name: /Serbia/i });

    expect(brazilLink).toHaveAttribute("href", "/countries/brazil");
    expect(usaLink).toHaveAttribute("href", "/countries/serbia");
  });
});
