import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl: string = "/api/carts/";

  constructor(private http: HttpClient) { }

  public getUserCart(): Observable<Icart[]> {
    console.log(this.http.get<Icart[]>(this.cartUrl));
    return this.http.get<Icart[]>(this.cartUrl);
  }
}
