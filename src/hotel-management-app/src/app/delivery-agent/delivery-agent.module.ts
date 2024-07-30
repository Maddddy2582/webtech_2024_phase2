import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



import { DeliveryAgentRegistrationComponent } from './delivery-agent-registration/delivery-agent-registration.component';
import { DeliveryAgentProfileComponent } from './delivery-agent-profile/delivery-agent-profile.component';
import { DeliveryAgentLoginComponent } from './delivery-agent-login/delivery-agent-login.component';
import { DeliveryAgentDashboardComponent } from './delivery-agent-dashboard/delivery-agent-dashboard.component';
import { DeliveryAgentNavBarComponent } from './delivery-agent-navbar/delivery-agent-navbar.component';

const routes: Routes = [
  { path: 'register', component: DeliveryAgentRegistrationComponent },
  { path: 'profile', component: DeliveryAgentProfileComponent },
  { path: 'login', component: DeliveryAgentLoginComponent },
  { path: 'dashboard', component: DeliveryAgentDashboardComponent}
];

@NgModule({
  declarations: [
    DeliveryAgentRegistrationComponent,
    DeliveryAgentProfileComponent,
    DeliveryAgentLoginComponent,
    DeliveryAgentDashboardComponent,
    DeliveryAgentNavBarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule
  ]
})
export class DeliveryAgentModule { }
