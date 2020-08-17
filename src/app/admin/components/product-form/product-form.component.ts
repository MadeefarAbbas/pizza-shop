import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id;
  product: any = {
    id:null,
    title:'',
    price:'',
    imageUrl:'',
    description:''
  };
  constructor(private router:Router,private productService:ProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if(this.id) {
      this.product = this.productService.getProduct(this.id);
    }
  }

  onSaveOrUpdate(form:NgForm) {
    if(form.invalid) {
      return;
    }
    if(this.id) {
      this.productService.updateProduct(this.id,form.value);
    } else {
      this.productService.addProduct(form.value);
    }

    this.router.navigate(['/admin/products']);
  }

  onDelete() {
    if(!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
