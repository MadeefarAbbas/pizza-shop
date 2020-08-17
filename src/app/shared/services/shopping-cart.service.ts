import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item'
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartProductList = [];

  private productAdded = new Subject<ShoppingCartItem[]>();
  private cartTotalItemsUpdated = new BehaviorSubject<number>(0);

  constructor() { }

  getCartUpdateListener() {
    return this.productAdded.asObservable();
  }

  getCart() {
   return this.cartProductList.slice();
 }

 getCartCountUpdateListener() {
   return this.cartTotalItemsUpdated.asObservable();
 }

 calcTotal() {
   let total = 0;
   this.cartProductList.reduce((acc, prod) => acc+= prod.quantity ,0);
  this.cartProductList.forEach(product=>{
    total += product.quantity;
  })
  this.cartTotalItemsUpdated.next(total);
 }
 addProductToCart(product) {

  const productExistInCart = this.cartProductList.find(({id}) => id === product.id); // find product by name
  if (!productExistInCart) {
    this.cartProductList.push({...product, quantity:1}); // enhance "porduct" opject with "num" property
    this.productAdded.next([...this.cartProductList]);
    return;
  }
  productExistInCart.quantity += 1;
  this.productAdded.next([...this.cartProductList]);
 }
  removeProduct(product) {
    const productExistInCart = this.cartProductList.find(({id}) => id === product.id); // find product by name
    if (!productExistInCart) {
      return;
    }
    productExistInCart.quantity -= 1;
    if(productExistInCart.quantity == 0) {
      this.cartProductList = this.cartProductList.filter(({id}) => id !== productExistInCart.id)
    }

    this.productAdded.next([...this.cartProductList]);
  }

  getTotalCartPrice() {
    let totalCartPrice = 0;
    this.getCart().forEach(cartItem => {
      totalCartPrice += (cartItem.price * cartItem.quantity);
    });
    return totalCartPrice;
  }

  getQuantity(product) {
    const productExistInCart = this.cartProductList.find(({id}) => id === product.id);
    if(!productExistInCart) {
      return 0;
    }
    return productExistInCart.quantity;
  }

  clearCart(){
    this.cartProductList = [];
    this.productAdded.next([])
  }

}
