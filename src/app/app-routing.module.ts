import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
// import { CustomerComponent } from './components/customer/customer.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  // { path: "home", component: LoginComponent },

  { path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
  { path: "home", component: LoginPanelComponent },



  // { path: "products", canActivate: [LoginGuardService], component: ProductsComponent },
  // { path: "users", canActivate: [LoginGuardService], component: UsersComponent },
  // { path: "add-user", canActivate: [LoginGuardService], component: AddUserComponent },
  // { path: "about", component: AboutComponent },
  // { path: "customer", component: CustomerComponent },
  // { path: "contact-us", component: ContactUsComponent },
  // { path: "login", component: LoginComponent },
  { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [Page404Component ]
