import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

import { AuthService } from '../../../shared/services/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  totalCartItems = 0;
  cartSubs: Subscription;
  countSubs: Subscription;
  constructor(private authService: AuthService,private shoppingCartService:ShoppingCartService) {
  }

   ngOnInit() {
    // this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    // this.cart$ = await this.shoppingCartService.getCart();
    this.countSubs = this.shoppingCartService.getCartCountUpdateListener().subscribe(count=>{
      this.totalCartItems = count;
    });
    this.cartSubs = this.shoppingCartService.getCartUpdateListener().subscribe(cartProducts => {
      this.totalCartItems = cartProducts.length;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(){
    if(this.authListenerSubs) {
      this.authListenerSubs.unsubscribe();
    }
  }
}
