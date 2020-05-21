import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemsService } from 'src/app/services/cart-items.service';
// import { CartService } from 'src/app/services/cart.service';
import { IcartItem } from 'src/app/models/cart-items';
// import { Icart } from 'src/app/models/cart';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css', '../../styles/childStyle.css']
})
export class MyCartComponent implements OnInit {

  cartItems: IcartItem[];

  displayedColumns = ['image_path', 'product_name', 'price', 'quantity', 'sum'];

  constructor(private cartItemsService: CartItemsService, private router: Router) { }

  ngOnInit() {

    this.getAllCartItems();

    this.cartItemsService.needToRefetchSubject.subscribe((value) => {
      if (value) this.getAllCartItems();
    })
  }

  getAllCartItems(): void {
    this.cartItemsService.getAllCartItems()
      .subscribe(cartItem => this.cartItems = cartItem);
  }

  updateCartItem(cartItem) {
    this.cartItemsService.updateCartItem(cartItem)
      .subscribe()
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

  increament(item) {
    if(item.quantity < 50) {

      item.quantity = item.quantity + 1;

      let cartItem = {
        product_id: item.product_id,
        quantity: item.quantity
      }
  
      this.updateCartItem(cartItem);  
    }
  }
  
  decreament(item) {
    if(item.quantity > 1) {
      
      item.quantity = item.quantity - 1;

      let cartItem = {
        product_id: item.product_id,
        quantity: item.quantity
      }
  
      this.updateCartItem(cartItem);  
    }
  }



}
