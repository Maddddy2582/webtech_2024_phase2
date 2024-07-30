import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { registerFormType } from '../../models/registerForm.model';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private registerForm: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.registrationForm = this.registerForm.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }) as FormGroup & {value: registerFormType} ;
  }

  onSubmit() {
    if (this.registrationForm.valid) {      
      const result: string | void = this.customerService.registerCustomer(this.registrationForm.value);
      if (result === 'Email already exists') {
        this.errorMessage = result;
        this.successMessage = null;
      } else {
        this.successMessage = 'Registration successful';
        this.errorMessage = null;
        this.registrationForm.reset();
        this.router.navigate(['/login']);
      }
  }
}
}
