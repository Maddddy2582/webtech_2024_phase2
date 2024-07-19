import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './customer/registration/registration.component';
import { LoginComponent } from './customer/login/login.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { DashboardComponent } from './customer/dashboard/dashboard.component';
import { MenuComponent } from './customer/menu/menu.component';
import { CartComponent } from './customer/cart/cart.component';
import { PaymentComponent } from './customer/payment/payment.component';

const routes: Routes = [
  {path: 'register' , component: RegistrationComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'menu/:id', component:MenuComponent},
  {path: 'cart', component: CartComponent},
  {path: 'payment', component: PaymentComponent},
  {path: '',component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
