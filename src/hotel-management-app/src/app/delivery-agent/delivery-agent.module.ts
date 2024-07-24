import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { MatCardTitle } from '@angular/material/card';
import { MatCard } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCardSubtitle } from '@angular/material/card';


import { DeliveryAgentRegistrationComponent } from './delivery-agent-registration/delivery-agent-registration.component';
import { DeliveryAgentProfileComponent } from './delivery-agent-profile/delivery-agent-profile.component';
import { DeliveryAgentLoginComponent } from './delivery-agent-login/delivery-agent-login.component';
import { DeliveryAgentDashboardComponent } from './delivery-agent-dashboard/delivery-agent-dashboard.component';

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
    DeliveryAgentDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatToolbar,
    MatFormFieldModule,
    MatLabel,
    MatError,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatInput,
    MatButton,
    MatCardSubtitle

  ]
})
export class DeliveryAgentModule { }
