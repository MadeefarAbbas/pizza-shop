import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders = [];
  private orderUpdate = new Subject();

  constructor() { }


  getOrders(){
    return this.orders.slice();
  }

  getOrderListener() {
    return this.orderUpdate.asObservable();
  }

  placeorder(shipping) {
    let id = this.getOrders().length + 1;
    let order = {id:id,...shipping};
    this.orders.push(order);
    this.orderUpdate.next(order);
  }
}
