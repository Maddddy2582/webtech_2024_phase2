import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryAgentService } from '../../services/delivery-agent.service';

@Component({
  selector: 'app-delivery-agent-login',
  templateUrl: './delivery-agent-login.component.html',
  styleUrls: ['./delivery-agent-login.component.css']
})

export class DeliveryAgentLoginComponent {
  loginForm: FormGroup
  loginFailed: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private deliveryAgentService: DeliveryAgentService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.deliveryAgentService.login(email, password)) {
        this.router.navigate(['/delivery-agent/profile']);
      } else {
        this.loginFailed = true;
        this.errorMessage = 'Invalid email or password';

      }
    }
  }
}
