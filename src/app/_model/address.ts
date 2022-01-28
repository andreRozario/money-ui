import { City } from "./city";

export class Address {

  location?: string;
  number?: string;
  complement?: string;
  district?: string;
  zipcode?: string;
  city = new City();
}
