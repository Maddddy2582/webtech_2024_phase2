import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './customer/registration/registration.component';
import { LoginComponent } from './customer/login/login.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { DashboardComponent } from './customer/dashboard/dashboard.component';
import { MenuComponent } from './customer/menu/menu.component';
import { CartComponent } from './customer/cart/cart.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { RestaurantRegistrationComponent } from './restaurant/registration/registration.component';
import { OwnerDashboardComponent } from './restaurant/owner-dashboard/owner-dashboard.component';
import { EditMenuComponent } from './restaurant/edit-menu/edit-menu.component';
import { EditRestaurantComponent } from './restaurant/edit-restaurant/edit-restaurant.component';
import { AddMenuItemComponent } from './restaurant/add-menu-item/add-menu-item.component';
import { SalesAnalyticsComponent } from './restaurant/sales-analytics/sales-analytics.component';
import { OrderManagementComponent } from './restaurant/order-management/order-management.component';



const routes: Routes = [
  {path: 'register' , component: RegistrationComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'menu/:id', component:MenuComponent},
  {path: 'cart', component: CartComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'register-restaurant', component: RestaurantRegistrationComponent},
  {path: 'owner-dashboard', component: OwnerDashboardComponent},
  { path: 'edit-restaurant/:id', component: EditRestaurantComponent },
  { path: 'edit-menu-item/:restaurantId/:itemId', component: EditMenuComponent },
  { path: 'add-menu-item/:restaurantId', component: AddMenuItemComponent },
  { path: 'sales-analytics/:restaurantId', component: SalesAnalyticsComponent },
  { path: 'order-management/:restaurantId', component: OrderManagementComponent },
  {path: '',component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
