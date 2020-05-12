import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IcartItem } from '../models/cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  // Mock
  private cartId: number = 8;

  private cartItemsUrl: string = "/api/cartItems/allCartItems/" + this.cartId;

  private addCartItemsUrl: string = "/api/cartItems";
  

  constructor(private http: HttpClient) { }

  public getAllCartItems(): Observable<IcartItem[]> {
    // console.log("start getallcartitemscall");
    // console.log("service: cart-items, function: getAllCartItems, url: " + this.cartItemsUrl);
    // console.log(this.http.get<IcartItem[]>(this.cartItemsUrl));
    return this.http.get<IcartItem[]>(this.cartItemsUrl);
  }

  addCartItem (cartItem: IcartItem): Observable<IcartItem> {
    return this.http.post<IcartItem>(this.addCartItemsUrl, cartItem);
      // .pipe(
      //   catchError(this.handleError('addCartItem', cartItem))
      // );
  }
}


