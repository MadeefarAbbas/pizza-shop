import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  products: Product[];
  productSubscription: Subscription;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts()
    this.productSubscription = this.productService.getProductUpdateListener().subscribe((products:Product[]) => {
      this.products = products;
    });
  }

  ngOnDestroy(){
    if(this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
