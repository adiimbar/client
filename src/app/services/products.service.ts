import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl: string = "http://localhost:3000/products/";

  constructor(private http: HttpClient) { }


  getProducts(){
    return [
      {
      "product_id": 5,
      "product_name": "milk",
      "category_id": 5,
      "price": "6.50",
      "image_path": "asets/productImages/milk.png"
      },
      {
      "product_id": 6,
      "product_name": "yogurt",
      "category_id": 5,
      "price": "4.20",
      "image_path": "asets/productImages/yogurt.png"
      },
      {
      "product_id": 7,
      "product_name": "yellow cheese",
      "category_id": 5,
      "price": "12.00",
      "image_path": "asets/productImages/yellowCheese.png"
      }
    ];
  }

  public getAllProducts(): Observable<Iproduct[]> {
    console.log(this.http.get<Iproduct[]>(this.productsUrl));
    return this.http.get<Iproduct[]>(this.productsUrl);
  }
}
