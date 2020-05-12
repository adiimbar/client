import { Component, OnInit } from '@angular/core';
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

  constructor(private cartItemsService: CartItemsService) { }

  ngOnInit(): void {

    this.getAllCartItems();
  }

  getAllCartItems(): void {
    this.cartItemsService.getAllCartItems()
    .subscribe(cartItem => this.cartItems = cartItem);
  }

  getTotalCostOfItemsInCart() {
    // the map operator throws an error
    // return this.cartItems.map(t => (Number(t.price)*Number(t.quantity))).reduce((acc, value) => acc + value, 0);
    // return this.cartItems.forEach();
  }

  placeOrder(cartItems) {
    console.log('order was clicked');
    console.log(cartItems);
  }

}
