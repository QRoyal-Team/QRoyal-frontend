import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartitem';
import { Product } from '../models/product';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: CartItem[] = [];
  constructor(private alertService: AlertService) {}

  public add(product: Product, quantity: Number) {
    this.products = this.getCart();
    let cartItem: CartItem = product as unknown as CartItem;
    let exits = this.products.find((product) => product.id == cartItem.id);
    if (exits) {
      exits.quantityItem++;
      this.alertService.success(cartItem.name + ' Số lượng +1');
      this.save();
      return;
    }
    cartItem.quantityItem = quantity;
    this.products.push(cartItem);
    this.save();
  }

  public remove(id: any) {
    this.products = this.getCart();
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        this.products.splice(i, 1);
      }
    }
    this.save();
  }

  public count(): any {
    this.products = this.getCart();
    return this.products.length;
  }

  public getCart(): CartItem[] {
    this.products = JSON.parse(localStorage.getItem('cart')!);
    if (this.products == null) {
      return (this.products = []);
    }
    return this.products;
  }

  public save() {
    localStorage.setItem('cart', JSON.stringify(this.products));
  }

  public getTotal() {}

  public clear() {
    localStorage.removeItem('cart');
  }
}
