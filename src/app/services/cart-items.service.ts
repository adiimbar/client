import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IcartItems } from '../models/cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  // Moke
  private cartId: number = 8;

  private cartItemsUrl: string = "/api/cartItems/allCartItems/" + this.cartId;

  

  constructor(private http: HttpClient) { }

  public getAllCartItems(): Observable<IcartItems[]> {
    // console.log("start getallcartitemscall");
    console.log("service: cart-items, function: getAllCartItems, url: " + this.cartItemsUrl);
    console.log(this.http.get<IcartItems[]>(this.cartItemsUrl));
    return this.http.get<IcartItems[]>(this.cartItemsUrl);
  }
}
