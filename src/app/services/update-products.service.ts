import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Iproduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductsService {

  // private itemToUpdate = new Subject<Iproduct[]>([]);
  private _itemToUpdateSource = new Subject<Iproduct>();
  itemToUpdate$ = this._itemToUpdateSource.asObservable();

  constructor() { }

  pushItemDetails(item: Iproduct) {
    this._itemToUpdateSource.next(item);
  }
}
