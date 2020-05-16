import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {


  orderForm: FormGroup;
  requiredAlert: string = 'field is required';
  minDate: Date;
  maxDate: Date;


  createForm() {

    this.orderForm = this.fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      shippingDate: ['', [Validators.required]],
      creditCard: ['', [Validators.required]]
    });
  }

  constructor(private fb: FormBuilder, private usersService: UserService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 0);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    // need to fetch userData from cache and fill the fileds
    // await let useDetails = this.getUser();
    // this.createForm(useDetails);
    this.createForm();
  }

  // getUser(): void {
  //   this.usersService
  //     .getUser()
  //     // .subscribe(products => this.products = products);
  // }


  // need to make city option global
  cityOptions = ['Tel Aviv', 'Jerusalem', "Be'er Sheva"];
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 6;
  }

  orderClick() {}

}
