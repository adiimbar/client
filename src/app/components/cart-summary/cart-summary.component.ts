import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { IcartItem } from 'src/app/models/cart-items';


@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems: IcartItem[];
  totalPrice: number;
  // displayedColumns = ['item', 'cost', 'cost'];

  constructor(private cartItemsService: CartItemsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCartItems();
    this.totalPrice = 0;
  }

  getAllCartItems(): void {
    this.cartItemsService.getAllCartItems()
      .subscribe(cartItem => this.cartItems = cartItem);
  }

  // calculate the total price of the cart
  sumUpTotalPrice() {
    this.totalPrice = 0;
    // console.log(this.cartItems);
    for (let value of Object.values(this.cartItems)) {
      this.totalPrice = this.totalPrice + (Number(value.price) * value.quantity);
    }

    return this.totalPrice
  }

  BackToCartButton() {
    console.log('BackToCartButton clicked');
    this.router.navigate(["/store"]);
  }

}
