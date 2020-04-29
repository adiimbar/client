import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './modules/material-module';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
// import { UserService } from './services/user.service';
// import { ProductsService } from './services/products.service';


// youtube #23 - Routing and Navigation
// we can prevent importing the same component twice
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { AboutComponent } from './components/about/about.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    RegisterComponent,
    AdminComponent,
    MainPanelComponent,
    AboutComponent,
    StoreInfoComponent,
    LoginPanelComponent,
    SignInComponent,
    MyCartComponent,
    ProductsComponent,
    OrdersComponent,

    routingComponents,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [
    // UserService,
    // ProductsService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }

  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
