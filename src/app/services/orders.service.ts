import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetails } from '../models/OrderDetails';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersUrl: string = "/api/orders";

  constructor(private http: HttpClient) { }

  addOrder (order: OrderDetails): Observable<OrderDetails> {
    return this.http.post<OrderDetails>(this.ordersUrl, order, httpOptions);
      // .pipe(
      //   catchError(this.handleError('addCartItem', cartItem))
      // );
  }

}
