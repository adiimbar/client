import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IcartItem } from '../models/cart-items';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  needToRefetchSubject = new Subject();
  private cartItemsUrl: string = '/api/cartItems';


  constructor(private http: HttpClient) { }

  public getAllCartItems(): Observable<IcartItem[]> {
    return this.http.get<IcartItem[]>(`${this.cartItemsUrl}/allCartItems`, httpOptions)
  }

  addCartItem (cartItem: IcartItem): Observable<IcartItem> {
    return this.http.post<IcartItem>(this.cartItemsUrl, cartItem, httpOptions)
      .pipe(tap(() => {
        this.needToRefetchSubject.next(true);
      }));
      // .pipe(
      //   catchError(this.handleError('addCartItem', cartItem))
      // );
  }

  deleteCartItem (productId: number): Observable<{}> {
    const url = `${this.cartItemsUrl}/${productId}`;
    return this.http.delete(url, httpOptions)
      .pipe(tap(() => {
        this.needToRefetchSubject.next(true);
      }));
      // .pipe(
      //   catchError(this.handleError('deleteHero'))
      // );
  }

  emptyCartItems (): Observable<{}> {
    const url = `${this.cartItemsUrl}/emptyCartItems`;
    return this.http.delete(url, httpOptions)
      .pipe(tap(() => {
        this.needToRefetchSubject.next(true);
      }));
      // .pipe(
      //   catchError(this.handleError('deleteHero'))
      // );
  }

  public updateCartItem (cartItem: IcartItem): Observable<IcartItem> {
    const url = `${this.cartItemsUrl}`;
    return this.http.put<IcartItem>(url, cartItem,httpOptions)
      .pipe(tap(() => {
        this.needToRefetchSubject.next(true);
      }));
      // .pipe(
      //   catchError(this.handleError('updateProduct', hero))
      // );
  }


}


