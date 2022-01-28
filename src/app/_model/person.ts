import { Address } from "./address";

export class Person {

  id?: number;
  name?:string;
  address = new Address();
  status = true;
  // contacts = new Array<Contact>();
}
