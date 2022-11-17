import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderSuccess } from '../models/ordersuccess';
import { ApiResponse, BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService<OrderSuccess> {
  constructor(http: HttpClient) {
    super('client/order', http);
  }
  public order(order: Order): Observable<ApiResponse<OrderSuccess>> {
    return this.mapAndCatchError(this.http.post<ApiResponse<OrderSuccess>>(this.apiEndPoint + this.url + '/payment', order, this.httpOptions));
  }
  public orderStatus(orderStatus: any): Observable<ApiResponse<OrderSuccess>> {
    return this.makeRequest('get', this.url + '/info', orderStatus);
  }
}
