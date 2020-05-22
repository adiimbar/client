import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { PasswordCrossFieldValidator } from 'src/app/validators/password-cross-field.validator';
import { checkPassword } from 'src/app/validators/check-password.validator';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserRegistrationDetails } from 'src/app/models/UserRegistrationDetails';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


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
export class RegistrationComponent implements OnInit, AfterViewInit {

  registrationForm: FormGroup;
  
  userRegistrationDetails: UserRegistrationDetails[];
  errorMatcher = new CrossFieldErrorMatcher();
  hide = true;
  requiredAlert: string = 'field is required';
  // formFirstStep: string = 'block';
  // formSecondStep: string = 'none';
  @ViewChild('idRef') idElementRef: ElementRef;
  registrationStep: string;


  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.registrationForm = this.fb.group({
      identificationNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{9}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(emailregex),
      ]],
      password: ['', [Validators.required, checkPassword]],
      confirmPassword: ['', [Validators.required, checkPassword]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
      // });
    }, { validator: PasswordCrossFieldValidator });
  }

  constructor(private fb: FormBuilder, private usersService: UserService, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
    this.registrationStep = 'stepOne';
    this.createForm();
  }

  ngAfterViewInit() {
    this.idElementRef.nativeElement.focus();
  }

  // checkPassword(control) {
  //   let enteredPassword = control.value
  //   let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //   return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  // }

  getErrorIdentificationNumber() {
    return this.registrationForm.get('identificationNumber').hasError('required') ? 'Field is required' :
      this.registrationForm.get('identificationNumber').hasError('pattern') ? 'Not a valid id number' : '';
  }


  getErrorEmail() {
    return this.registrationForm.get('email').hasError('required') ? 'Field is required' :
      this.registrationForm.get('email').hasError('pattern') ? 'Not a valid email address' : '';
    // this.registrationForm.get('email').hasError('alreadyInUse') ? 'This email address is already in use' : '';
  }

  getErrorPassword() {
    return this.registrationForm.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.registrationForm.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  getErrorconfirmPassword() {
    return this.registrationForm.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.registrationForm.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  // matcher = new MyErrorStateMatcher();

  // need to make city option global
  cityOptions = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', "Be'er Sheva", 'Bnei Brak', 'Holon'];

  // next() { }

  submitSignUp() {

    if(this.registrationForm.valid) {

      let user: UserRegistrationDetails = this.registrationForm.value;

      // let failedRegistration: boolean = true;

      this.usersService
        .addUser(user)
        .subscribe(result => {
          console.log(result);
          this.dialogRef.close();

          // failedRegistration = false;
        });
      
      // if(failedRegistration) {
      //   alert('invalid details');
      // }

        // this.dialogRef.beforeClosed();
  
    }

  }

  formNextButton() {
    this.registrationStep = 'stepTwo';

  }

  formBackButton() {
    this.registrationStep = 'stepOne';
  }


}
