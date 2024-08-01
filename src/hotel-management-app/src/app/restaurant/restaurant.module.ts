import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantRegistrationComponent} from './registration/registration.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item.component';
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Chart , registerables} from 'chart.js';
import { OrderManagementComponent } from './order-management/order-management.component'
Chart.register(...registerables)





@NgModule({
  declarations: [
    RestaurantRegistrationComponent,
    OwnerDashboardComponent,
    EditRestaurantComponent,
    EditMenuComponent,
    AddMenuItemComponent,
    SalesAnalyticsComponent,
    OrderManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [RestaurantService],
  exports: [RestaurantRegistrationComponent]
})
export class RestaurantModule { }
