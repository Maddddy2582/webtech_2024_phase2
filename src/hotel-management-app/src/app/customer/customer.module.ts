import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
// import { NavBarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RegistrationComponent,
    ProfileComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    CartComponent,
    PaymentComponent,
    OrderTrackingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    SharedModule

  ],
  exports: [
    RegistrationComponent,
    ProfileComponent,
    LoginComponent,
    DashboardComponent
  ]
})
export class CustomerModule { }
