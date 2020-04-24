import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl: string = "/api/products/";

  constructor(private http: HttpClient) { }
  
  public getAllProducts(): Observable<Iproduct[]> {
    console.log(this.http.get<Iproduct[]>(this.productsUrl));
    return this.http.get<Iproduct[]>(this.productsUrl);
  }
}
