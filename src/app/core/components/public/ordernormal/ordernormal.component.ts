import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderSuccess } from 'src/app/core/models/ordersuccess';
import { AlertService } from 'src/app/core/services/alert.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-ordernormal',
  templateUrl: './ordernormal.component.html',
  styleUrls: ['./ordernormal.component.css'],
})
export class OrdernormalComponent implements OnInit {
  loading: Boolean = false;
  orderStatus!: OrderSuccess;
  params: any;
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParams;
    this.orderStatus = JSON.parse(localStorage.getItem('order')!);
  }

  getTotal(){
      return this.orderStatus.order.order_details.reduce((i:any, item:any) => {
        return i + item.total;
      }, 0);
  }
}
