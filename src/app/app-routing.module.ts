import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { Page404Component } from './components/page404/page404.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { OrdersPanelComponent }from './components/orders-panel/orders-panel.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
// import { from } from 'rxjs';
import { RouteGuard } from './route.guard';

const routes: Routes = [

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: LoginPanelComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "store", canActivate: [RouteGuard], component: MainPanelComponent},
  { path: "admin", canActivate: [RouteGuard], component: AdminPanelComponent},
  { path: "orders", canActivate: [RouteGuard], component: OrdersPanelComponent},
  { path: "**", component: Page404Component }

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
