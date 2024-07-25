import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryAgentService } from '../../services/delivery-agent.service';
import { DeliveryAgent } from '../../models/delivery-agent.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-agent-registration',
  templateUrl: './delivery-agent-registration.component.html',
  styleUrls: ['./delivery-agent-registration.component.css']
})
export class DeliveryAgentRegistrationComponent {
  registrationForm: FormGroup;
  registrationFailed: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private deliveryAgentService: DeliveryAgentService,
    private router : Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registrationForm.valid) {
      const { name, email, password, phone } = this.registrationForm.value;
      const newAgent: DeliveryAgent = { name, email, password, phone };

      if (this.deliveryAgentService.registerAgent(newAgent)) {
        console.log("YES");
        this.errorMessage = null;
        this.successMessage = "Registration Successful";
        this.router.navigate(['/delivery-agent/login']);
      } else {
        this.successMessage = null;
        this.errorMessage = "Email already exists";
        this.registrationForm.reset();
        this.registrationFailed = true;
      }
    }
  }
}
