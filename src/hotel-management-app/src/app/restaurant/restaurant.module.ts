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
import { HttpClientModule } from '@angular/common/http';
// import {Matdivi}

@NgModule({
  declarations: [
    RestaurantRegistrationComponent,
    OwnerDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [RestaurantService],
  exports: [RestaurantRegistrationComponent]
})
export class RestaurantModule { }
