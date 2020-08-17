import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart: ShoppingCartItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {}

   ngOnInit() {
    this.cart =  this.shoppingCartService.getCart();
  }
}
