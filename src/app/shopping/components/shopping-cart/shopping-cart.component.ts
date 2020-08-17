import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCartItem[] = [];
  cartSubs: Subscription;
  deliveryCost = 10;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.cart = this.shoppingCartService.getCart();
    this.cartSubs = this.shoppingCartService.getCartUpdateListener().subscribe((cartItems) => {
      this.cart = cartItems;
    });
  }


  totalCost() {
    return this.shoppingCartService.getTotalCartPrice();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
