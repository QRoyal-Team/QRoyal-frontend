import { Catalog } from "./catalog";

export class Product {
  id!: Number;
  name!: String;
  quantity!: Number;
  price!: any;
  discount!: any;
  description!: String;
  images!: String[];
  created!: Date;
  catalog!: Catalog;
}
