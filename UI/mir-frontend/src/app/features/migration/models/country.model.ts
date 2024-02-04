import { City } from "./city.model";

export interface Country {
  country: string;
  cities: City[];
}
