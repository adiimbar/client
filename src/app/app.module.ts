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

import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { AboutComponent } from './components/about/about.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersPanelComponent } from './components/orders-panel/orders-panel.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';




@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    MainPanelComponent,
    AboutComponent,
    StoreInfoComponent,
    LoginPanelComponent,
    RegistrationComponent,
    MyCartComponent,
    ProductsComponent,
    OrdersComponent,
    OrdersPanelComponent,
    CartSummaryComponent,
    AdminPanelComponent,
    AdminProductsComponent,
    OrderDialogComponent,

    routingComponents,



  ],
  entryComponents: [OrderDialogComponent, RegistrationComponent],
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

    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }

  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
