import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/core/models/cartitem';
import { AlertService } from 'src/app/core/services/alert.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private alertService: AlertService, public cartService: CartService) {}

  ngOnInit(): void {
  }

  getTotal(item: CartItem): any {
    return (item.price - item.price * (item.discount / 100)) * item.quantityItem;
  }

  getTotals(items:CartItem[]){
    return items.reduce((i,item)=>{return i + this.getTotal(item)},0)
  }

  updateQuantity(item:CartItem,value:String){
    if(value=='+'){
      this.cartService.increase(item)
    }else{
      this.cartService.decrease(item)
    }
  }
}
