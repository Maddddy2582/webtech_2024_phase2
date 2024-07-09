import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './customer/registration/registration.component';
import { LoginComponent } from './customer/login/login.component';
import { ProfileComponent } from './customer/profile/profile.component';

const routes: Routes = [
  {path: 'register' , component: RegistrationComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '',component: RegistrationComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
