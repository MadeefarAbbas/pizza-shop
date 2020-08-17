import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  category: string;
  productsSubscriptions: Subscription;

  constructor(
    private productService: ProductService,
  ) {
  }

  async ngOnInit() {
    this.populateProducts();
  }

  private populateProducts() {
    this.products = this.productService.getAllProducts();
    this.productsSubscriptions = this.productService.getProductUpdateListener()
    .subscribe(products =>{
      this.products = products;
    })
  }

  ngOnDestroy(){
    if(this.productsSubscriptions) {
      this.productsSubscriptions.unsubscribe();
    }
  }

}
