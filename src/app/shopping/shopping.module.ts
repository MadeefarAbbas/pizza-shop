import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { RouterModule } from '@angular/router';

import { AuthGuard } from "../shared/guards/auth.guard";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [CheckOutComponent, MyOrdersComponent, OrderSuccessComponent, ProductsComponent, ShippingFormComponent, ShoppingCartComponent, ShoppingCartSummaryComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BrowserModule,
    RouterModule.forChild([

      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent,canActivate: [AuthGuard] }, //, canActivate: [AuthGuard]
      { path: 'order-success/:id', component: OrderSuccessComponent,canActivate: [AuthGuard] }, //, canActivate: [AuthGuard]
      { path: 'my/orders', component: MyOrdersComponent,canActivate: [AuthGuard] }, //, canActivate: [AuthGuard]
    ])
  ]
})
export class ShoppingModule { }
