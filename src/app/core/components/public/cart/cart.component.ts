import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/models/cartitem';
import { Order } from 'src/app/core/models/order';
import { OrderDetail } from 'src/app/core/models/orderdetail';
import { OrderSuccess } from 'src/app/core/models/ordersuccess';
import { AlertService } from 'src/app/core/services/alert.service';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  order: Order;
  isPayNow: Boolean = false;
  loading: Boolean = false;
  constructor(private alertService: AlertService, public cartService: CartService, private orderService: OrderService, private router: Router) {
    this.order = new Order();
  }

  ngOnInit(): void {}

  getTotal(item: CartItem): any {
    return (item.price - item.price * (item.discount / 100)) * item.quantityItem;
  }

  getTotals(items: CartItem[]) {
    return items.reduce((i, item) => {
      return i + this.getTotal(item);
    }, 0);
  }

  updateQuantity(item: CartItem, value: String) {
    if (value == '+') {
      this.cartService.increase(item);
    } else {
      this.cartService.decrease(item);
    }
  }

  checkout(form: any) {
    const testtest: OrderDetail[] = this.cartService.getCart().map((item) => {
      const order_detail = {
        product_id: item.id,
        quantity: item.quantityItem,
      };
      return order_detail;
    });
    this.order.order_details = testtest;
    if (this.isPayNow == true) {
      this.order.payment = {
        bank_code: 'NCB',
        return_url: location.origin + '/orderstatus',
      };
    }
    this.loading = true;
    this.orderService.order(this.order).subscribe((res) => {
      if (!res.hasErrors()) {
        this.cartService.clear();
        this.loading = false;
        let orderStatus: OrderSuccess = <OrderSuccess>(<unknown>res);
        if (orderStatus.data != null) {
          location.href = orderStatus.data;
        } else {
          console.log(orderStatus)
          localStorage.setItem('order', JSON.stringify(orderStatus));
          this.router.navigate(['/ordernormal', orderStatus]);
        }
      } else {
        this.alertService.error('Something error !!!');
      }
    });
  }

  clickPayOption(selectedChoice: boolean) {
    this.isPayNow = selectedChoice;
  }
}
