import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {

  orders = [];
  ordersSubs: Subscription;

  constructor(private orderServices: OrderService) { }

  ngOnInit(): void {
    this.orders = this.orderServices.getOrders();
    this.ordersSubs = this.orderServices.getOrderListener().subscribe((orders: any[])=>{
      this.orders = orders;
    });
  }

  ngOnDestroy(){
    if(this.ordersSubs){
      this.ordersSubs.unsubscribe();
    }
  }
}
