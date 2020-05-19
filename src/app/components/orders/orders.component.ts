import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserDetails } from 'src/app/models/UserDetails';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { IcartItem } from 'src/app/models/cart-items';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userDetails: UserDetails[];

  userModel;


  cartItems: IcartItem[];

  // need to make city option global
  cityOptions = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', "Be'er Sheva", 'Bnei Brak', 'Holon'];

  orderForm: FormGroup;
  requiredAlert: string = 'field is required';
  minDate: Date;
  maxDate: Date;  

  public orderDetails: OrderDetails

  createForm() {

    this.orderForm = this.fb.group({
      // city: [this.userDetails.city, [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      shippingDate: ['', [Validators.required]],
      creditCard: ['', [Validators.required]]
    });
  }

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private cartItemsService: CartItemsService,
    private router: Router,
    private userService: UserService) {
    
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 0);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.orderDetails = new OrderDetails();
  }

  ngOnInit() {
    // need to fetch userData from cache and fill the fileds
    this.getUser();
    // this.createForm(useDetails);
    this.createForm();
  }

  getUser(){
    this.userService
      .getUser()
      .subscribe(user => this.userModel = user);
  }


  emptyCartItems() {
    this.cartItemsService
      .emptyCartItems()
      .subscribe();
  }



  //   // Prevent Saturday from being selected.  
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   return day !== 6;
  // }

  orderClick() {

    if (this.orderForm.valid) {
      console.log(this.orderForm.valid);

      this.orderDetails.city = this.orderForm.value.city;
      this.orderDetails.street = this.orderForm.value.street;
      this.orderDetails.shippingDate = this.orderForm.value.shippingDate;
      this.orderDetails.creditCard = this.orderForm.value.creditCard;

      console.log(this.orderDetails)


      // // need to move the call
      // //first need to make sure the user want to order
      this.ordersService
      .addOrder(this.orderDetails)
      // // .addCartItem(newCartItem)
      .subscribe(res => console.log(res));


      this.emptyCartItems();
      this.router.navigate(["/store"]);


      // need to remove this
      alert('order submited successfully');

    }
    else {
      console.log('form not valid');
    }

    // console.log(this.userDetails.firstName);
  }


}
