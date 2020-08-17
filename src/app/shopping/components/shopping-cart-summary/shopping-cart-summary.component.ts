import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit, OnDestroy {
  @Input('cart') cart;
  deliveryCost = 10;
  totalCartItems = 0;
  countSubs:Subscription;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.countSubs = this.shoppingCartService.getCartCountUpdateListener().subscribe(count=>{
      this.totalCartItems = count;
    });
  }

  totalCost() {
    return this.shoppingCartService.getTotalCartPrice() + this.deliveryCost;
  }

  ngOnDestroy(){
    if(this.countSubs) {
      this.countSubs.unsubscribe();
    }
  }

}
