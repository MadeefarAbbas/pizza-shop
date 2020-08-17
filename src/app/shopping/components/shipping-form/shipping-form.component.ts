import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  @Input('cart') cart;
  shipping = {
    name:'',
    addressLine1:'',
    addressLine2:'',
    city:''
  };
  userId: string;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartServices: ShoppingCartService
    ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  async placeOrder() {
    this.orderService.placeorder(this.shipping);
    this.cartServices.clearCart();
    this.router.navigate(['/order-success',0]);
  }
}
