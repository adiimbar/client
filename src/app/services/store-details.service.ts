import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreDetails } from '../models/storeDetails';

@Injectable({
  providedIn: 'root'
})
export class StoreDetailsService {

  private storeDetailsUrl: string = '/api/orders/getNumberOfOrders';

  constructor(private http: HttpClient) { }

  public getStoreDetails(): Observable<StoreDetails[]> {
    const url = `${this.storeDetailsUrl}`;
    return this.http.get<StoreDetails[]>(url);
  }
}
