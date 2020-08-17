import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(){}

  addToCart() {
    this.cartService.addProductToCart(this.product);
    this.cartService.calcTotal();
  }

  removeFromCart() {
    this.cartService.removeProduct(this.product);
    this.cartService.calcTotal();
  }

  getProductQuantity(product) {
    return this.cartService.getQuantity(product);
  }


}
