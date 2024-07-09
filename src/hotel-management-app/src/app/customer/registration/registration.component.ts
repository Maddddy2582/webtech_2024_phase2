import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {      
      const result = this.customerService.register(this.registrationForm.value);
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
