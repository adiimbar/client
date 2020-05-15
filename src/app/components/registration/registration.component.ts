import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { PasswordCrossFieldValidator } from 'src/app/validators/password-cross-field.validator';
import { checkPassword } from 'src/app/validators/check-password.validator';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserRegistrationDetails } from 'src/app/models/UserRegistrationDetails';
import { UserService } from 'src/app/services/user.service';


/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  userRegistrationDetails: UserRegistrationDetails[];
  errorMatcher = new CrossFieldErrorMatcher();
  hide = true;
  requiredAlert: string = 'field is required';


  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.registrationForm = this.fb.group({
      identificationNumber: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern(emailregex),
      ]],
      password: ['', [Validators.required, checkPassword]],
      confirmPassword: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    // });
  }, {validator: PasswordCrossFieldValidator});
}

  constructor(private fb: FormBuilder, private usersService: UserService) { }

  ngOnInit() {
    this.createForm();
  }

  // checkPassword(control) {
  //   let enteredPassword = control.value
  //   let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //   return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  // }

  getErrorEmail() {
    return this.registrationForm.get('email').hasError('required') ? 'Field is required' :
      this.registrationForm.get('email').hasError('pattern') ? 'Not a valid email address' : '';
        // this.registrationForm.get('email').hasError('alreadyInUse') ? 'This email address is already in use' : '';
  }

  getErrorPassword() {
    return this.registrationForm.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.registrationForm.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }




  // matcher = new MyErrorStateMatcher();

  // need to make city option global
  cityOptions = ['Tel Aviv', 'Jerusalem', "Be'er Sheva"];

  next() {}

  submitSignUp() {

    let user: UserRegistrationDetails = this.registrationForm.value;


    this.usersService
    .addUser(user)
    .subscribe();
    // .subscribe(user => this.userRegistrationDetails.push(user));


  }

  // onSubmit() {
  //   // console.log(this.userModel);
  // }


}
