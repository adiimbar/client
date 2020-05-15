import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { checkPassword } from 'src/app/validators/check-password.validator';


// import { url } from ("src/app/styles/buttons.css");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
                // 'src/app/styles/buttons.css'
              ]
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  requiredAlert: string = 'field is required';


  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(emailregex),
      ]],
      password: ['', [Validators.required, checkPassword]],
    });
  }


  ngOnInit() {
    this.createForm();
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  
  getErrorEmail() {
    return this.loginForm.get('email').hasError('required') ? 'Field is required' :
      this.loginForm.get('email').hasError('pattern') ? 'Not a valid email address' : '';
        // this.loginForm.get('email').hasError('alreadyInUse') ? 'This email address is already in use' : '';
  }

  getErrorPassword() {
    return this.loginForm.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.loginForm.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }


  hide = true;

  public userLoginDetails: UserLoginDetails;
  private usersService: UserService;

  // The router parameter is an example to a short writing of a member + it's assignment
  // private router: Router EQUIVALENT TO the following 3: 
  // 1. Member definition
  // 2. Parameter definition
  // 3. this.router = router
  constructor(usersService: UserService, private router: Router, private fb: FormBuilder) {
//        this.userLoginDetails = new UserLoginDetails('', '');
      this.userLoginDetails = new UserLoginDetails();
      this.usersService = usersService;
  }

  public login(): void{
    if(this.loginForm.valid === true) {

      this.userLoginDetails.email = this.loginForm.value.email;
      this.userLoginDetails.password = this.loginForm.value.password;

      console.log('console user Login Details: ' + this.userLoginDetails);
      console.log(this.userLoginDetails);

      // Creating an observable object
      // It looks like an http request had been issued BUT IT DIDN'T
      const observable = this.usersService.login(this.userLoginDetails);

      // The method subscribe() ussues an http request to the server
      // successfulServerRequestData
      observable.subscribe(successfulServerRequestData => {
          console.log(successfulServerRequestData);                    
          
          sessionStorage.setItem("token", successfulServerRequestData.token+"");
          this.usersService.userType = successfulServerRequestData.userType;

          if(successfulServerRequestData.userType == "CUSTOMER"){
              this.router.navigate(["/main/products"]);
          }

          if(successfulServerRequestData.userType == "ADMIN"){
              this.router.navigate(["/main/products"]);
          }

      }, serverErrorResponse => { // Reaching here means that the server had failed
          // this.router.navigate(["/home"]);
        // serverErrorResponse is the object returned from the ExceptionsHandler
          alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
      }); 

    } 
    else {
      console.log(this.loginForm); 
      // this.getErrorEmail()
    }

     

  }

  // public signUp() {
    
  // }


  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }


}

