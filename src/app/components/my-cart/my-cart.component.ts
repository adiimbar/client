import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { IcartItems } from 'src/app/models/cart-items';
import { Icart } from 'src/app/models/cart';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  cartItems: IcartItems[];

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
    return this.cartItems.map(t => (Number(t.price)*Number(t.quantity))).reduce((acc, value) => acc + value, 0);
    // return this.cartItems.forEach();
  }

  placeOrder(cartItems) {
    console.log('order was clicked');
    console.log(cartItems);
  }



  // displayedColumns = ['item', 'cost'];
  // transactions: Transaction[] = [
  //   {item: 'Beach ball', cost: 4},
  //   {item: 'Towel', cost: 5},
  //   {item: 'Frisbee', cost: 2},
  //   {item: 'Sunscreen', cost: 4},
  //   {item: 'Cooler', cost: 25},
  //   {item: 'Swim suit', cost: 15},
  // ];


}
