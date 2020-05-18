import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/product';
import { IaddProduct} from '../models/addProduct';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl: string = "/api/products/";
  // private uploadProductUrl: string = "/api/products/";

  constructor(private http: HttpClient) { }
  
  public getAllProducts(): Observable<Iproduct[]> {
    // console.log(this.http.get<Iproduct[]>(this.getProductsUrl));
    return this.http.get<Iproduct[]>(this.productsUrl);
  }

  public getAllProductsByCategoryId(categoryId): Observable<Iproduct[]> {
    // console.log(this.http.get<Iproduct[]>(this.getProductsUrl));
    return this.http.get<Iproduct[]>(this.productsUrl + categoryId);
  }

  public getProductByName(productName): Observable<Iproduct[]> {
    // console.log(this.http.get<Iproduct[]>(this.getProductsUrl));
    const url = `${this.productsUrl}/getProduct/${productName}`;
    return this.http.get<Iproduct[]>(url);
  }

  public addProduct(product: Iproduct[]): Observable<Iproduct[]> {
    // console.log(this.http.get<Iproduct[]>(this.productsUrl));
    return this.http.post<Iproduct[]>(this.productsUrl, product);
  }

  public updateProduct (product: Iproduct[]): Observable<Iproduct[]> {
    return this.http.put<Iproduct[]>(this.productsUrl, product)
      // .pipe(
      //   catchError(this.handleError('updateProduct', hero))
      // );
  }
}
