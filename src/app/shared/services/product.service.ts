import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
// RxJS v6+
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUpdated = new Subject<Product[]>();

  private products:Product[] =[
    {
      id:1,
      title:"Pizza Marinara",
      price: 49.99,
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, corporis.",
      imageUrl:"https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/83535_751-0-4864-4864.jpg"

    },
    {
      id:2,
      title:"Pizza Crudo",
      price: 20.99,
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, corporis.",
      imageUrl:"https://www.rachaelraymag.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_300/MTQzMjU4OTY1Njc1ODc4MjUz/pizza-crudo.webp"
    },
    {
      id:3,
      title:"Pizza montanara",
      price: 60,
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, corporis.",
      imageUrl:"https://cdn.tasteatlas.com/images/dishes/efef37c8e9394754b91e10d953e955bf.jpg?mw=1300"
    },
    {
      id:4,
      title:"Pizza Schiacciata",
      price: 80,
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, corporis.",
      imageUrl:"https://images.food52.com/zRyhODzMKAS0w-9Ovd4w4oypdOA=/768x511/5ca1ad39-c986-4251-ad1d-9cabd4a1cc8c--theperfectloaf-schiacciata-8.jpg"
    },
    {
      id:5,
      title:"Pizza Sarda",
      price: 90,
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, corporis.",
      imageUrl:"https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/12/pizza-sarda1-672x372.jpg"

    },
    {
      id:6,
      title:"Pizza Tonno",
      price: 50,
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, corporis.",
      imageUrl:"https://images.eatsmarter.com/sites/default/files/styles/576x432/public/pizza-tonno-519340.jpg"
    },
    {
      id:7,
      title:"Pizza Valtellina",
      price: 9.99,
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, corporis.",
      imageUrl:"https://media-cdn.tripadvisor.com/media/photo-s/17/1e/36/15/valtellina.jpg"
    },
    {
      id:8,
      title:"Pizza Diavola",
      price: 10,
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, corporis.",
      imageUrl:"https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Gt/2018/06/22/16087/GT1806_Principle_Pleasures_Pizza_diavolaA.jpg?width=922&height=768&mode=crop&anchor=topcenter&quality=75"
    },
  ]

  constructor(private http: HttpClient) { }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getAllProducts() {
   return this.products.slice();
 }

  addProduct(product:Product) {
    let id = this.products.length + 1;
    this.products.push({id:id,...product});
    this.productsUpdated.next(this.products.slice());
  }

  getProduct(id:number) {
    return this.products.find(p => p.id == id);
  }

  updateProduct(productId,product) {
    this.products.forEach((product,index) => {
      if(product.id == productId) {
        this.products[index] = product;
      }
    })
  }

  delete(id:number) {
    let index = this.products.findIndex(p => p.id == id);
    this.products.splice(index,1);
    this.productsUpdated.next(this.products.slice());
  }
}
