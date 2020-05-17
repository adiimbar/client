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

  constructor(private cartItemsService: CartItemsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCartItems();
  }

  getAllCartItems(): void {
    this.cartItemsService.getAllCartItems()
      .subscribe(cartItem => this.cartItems = cartItem);
  }

  BackToCartButton() {
    console.log('BackToCartButton clicked');
    this.router.navigate(["/store"]);
  }

}
