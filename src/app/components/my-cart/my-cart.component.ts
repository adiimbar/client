import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemsService } from 'src/app/services/cart-items.service';
// import { CartService } from 'src/app/services/cart.service';
import { IcartItem } from 'src/app/models/cart-items';
// import { Icart } from 'src/app/models/cart';



// need to make sure the table will update automaticaly


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  cartItems: IcartItem[];

  // currency: string = '&#8362;';

  displayedColumns = ['image_path', 'product_name', 'price', 'quantity', 'sum'];
  // transactions: Transaction[]

  constructor(private cartItemsService: CartItemsService, private router: Router) { }

  ngOnInit() {
  // ngOnInit(): void {

    this.getAllCartItems();

    this.cartItemsService.needToRefetchSubject.subscribe((value) => {
      if (value) this.getAllCartItems();
    })
  }

  getAllCartItems(): void {
    this.cartItemsService.getAllCartItems()
      .subscribe(cartItem => this.cartItems = cartItem);
  }

  getTotalCostOfItemsInCart() {
    // the map operator throws an error
    // console.log(this.cartItems);
    return this.cartItems.map(item => (Number(item.price)*Number(item.quantity))).reduce((acc, value) => acc + value, 0);
    // return this.cartItems.forEach();
  }

  placeOrder() {
    // moving to orders
    this.router.navigate(["/orders"]);

  }

  emptyCartButton() {
    this.cartItemsService
      .emptyCartItems()
      .subscribe();
  }

  deleteItem(productId) {
    this.cartItemsService
      .deleteCartItem(productId)
      .subscribe();
  }

}
