export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Array<{
      code: string;
      official: string;
      common: string;
    }>;
  };
  languages: Array<{
    code: string;
    name: string;
  }>;
  capital?: string[];
  region: string;
  population: number;
  flag: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  cca3: string;
  slug: string;
  latlng: [number, number];
  area: number;
  timezones: string[];
  status: string;
  independent: boolean;
  currencies: Array<{
    code: string;
    name: string;
    symbol: string;
  }>;
}
