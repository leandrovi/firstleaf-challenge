import { Award } from './Award';

export type Product = {
  "id": number;
  "special_notes": string;
  "name": string;
  "tag_line": string;
  "vintage":string;
  "origin": string;
  "fanciful_varietal": string;
  "msrp": number;
  "price": number;
  "display_msrp": string;
  "display_price": string;
  "award_highlights": Award
  "pairings": string;
  "color": string;
  "images": string;
  "ratings_pct": number;
  "display_name": string;
}