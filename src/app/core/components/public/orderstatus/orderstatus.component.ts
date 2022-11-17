import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderSuccess } from 'src/app/core/models/ordersuccess';
import { AlertService } from 'src/app/core/services/alert.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.css'],
})
export class OrderstatusComponent implements OnInit {
  loading: Boolean = false;
  orderStatus!: OrderSuccess;
  params: any;
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.params= this.activatedRoute.snapshot.queryParams;
    this.loading = true;
    this.orderService.orderStatus(this.params).subscribe((res) => {
      if (!res.hasErrors()) {
        this.loading = false;
        this.orderStatus = <OrderSuccess>(<unknown>res);
        console.log(this.orderStatus);
      } else {
        this.alertService.error('Something error !!!');
      }
    });
  }
}
