import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserDetails } from 'src/app/models/UserDetails';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { IcartItem } from 'src/app/models/cart-items';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderDialogComponent } from 'src/app/components/order-dialog/order-dialog.component';

import jsPDF from 'jspdf';
import autoTable, { autoTable as autoTableType} from 'jspdf-autotable';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../../styles/childStyle.css']
})
export class OrdersComponent implements OnInit {

  userDetails: UserDetails[];
  userModel: any;
  cartItems: IcartItem[];
  totalPrice: number;


  docHead = [['Product name', 'Quantity', 'Price']];
  docData = [];

  // need to make city option global
  cityOptions = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', "Be'er Sheva", 'Bnei Brak', 'Holon'];

  orderForm: FormGroup;
  requiredAlert: string = 'field is required';
  minDate: any;
  // minDate: Date;
  // maxDate: Date;  

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

  constructor(private fb: FormBuilder,
              private ordersService: OrdersService,
              private cartItemsService: CartItemsService,
              private router: Router,
              private userService: UserService,
              public dialog: MatDialog) {

    this.minDate = moment().format('YYYY-MM-DD');

    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date();
    // this.maxDate = new Date(currentYear + 1, 11, 31);
    // this.orderDetails = new OrderDetails();
  }

  ngOnInit() {
    this.getUser();
    this.getAllCartItems();
    this.createForm();
  }

  getUser(){
    this.userService
      .getUser()
      .subscribe(user => this.userModel = user);
  }

  getAllCartItems(): void {
    this.cartItemsService.getAllCartItems()
      .subscribe(cartItem => this.cartItems = cartItem);
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
      // // need to move the call
      // //first need to make sure the user want to order
      this.ordersService
      .addOrder(this.orderForm.value)
      .subscribe(res => console.log(res));

      this.openDialog();
      this.emptyCartItems();

      this.router.navigate(["/store"]);

    }
    else {
      console.log('form not valid');
    }

  }

  createPdf() {
    const doc = new jsPDF()
      this.insertCartItemsToTableBody();
      let totalPrice = this.sumUpTotalPrice();
      this.docData.push(['', '', 'Total price: ' + totalPrice])
      autoTable(doc, {
      head: this.docHead,
      body: this.docData,
    })

    doc.save('receipt.pdf');
  }

  insertCartItemsToTableBody() {
    this.docData = [];
    this.cartItems.map(item => {
      this.docData.push([item.product_name, item.quantity, item.price])
    });
  }

  sumUpTotalPrice() {
    this.totalPrice = 0;
    // console.log(this.cartItems);
    for (let value of Object.values(this.cartItems)) {
      this.totalPrice = this.totalPrice + (Number(value.price) * value.quantity);
    }

    this.totalPrice = Number(this.totalPrice.toFixed(2))

    return this.totalPrice
  }

  
  openDialog() {
    let dialogRef = this.dialog.open(OrderDialogComponent, {data: {name: this.userModel.firstName}});

    dialogRef.afterClosed().subscribe( downloadReceipt => {
      console.log(typeof(downloadReceipt));
      if(downloadReceipt === 'true') {
        this.createPdf();
      }

      console.log(`dialog downloadReceipt value: ${downloadReceipt}`)
    })
  }

  BackToCartButton() {
    console.log('BackToCartButton clicked');
    this.router.navigate(["/store"]);
  }
}
