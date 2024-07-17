import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { loginFormType } from '../../models/loginForm.model';

@Component({
  selector: 'app-customer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup
  errorMessage: string | null = null;

  constructor(private loginFormBuilder: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.loginForm = this.loginFormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }) as FormGroup & {value: loginFormType};
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value as loginFormType;
      const authenticated = this.customerService.authenticateCustomer(email, password);
      if (authenticated) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    }
  }
}
