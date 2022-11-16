import { Catalog } from './catalog';

export class CartItem {
  id!: Number;
  name!: String;
  quantityItem!: any;
  price!: any;
  discount!: any;
  images!: String[];
  catalog!: Catalog;
  total: any = (this.price - this.price * (this.discount / 100)) * this.quantityItem;
}
