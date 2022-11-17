import { Catalog } from './catalog';

export class CartItem {
  id!: Number;
  name!: String;
  quantityItem!: any;
  quantity!:any;
  price!: any;
  discount!: any;
  images!: String[];
  catalog!: Catalog;
}
