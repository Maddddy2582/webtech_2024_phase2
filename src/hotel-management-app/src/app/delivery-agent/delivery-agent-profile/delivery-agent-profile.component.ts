// src/app/delivery-agent/delivery-agent-profile/delivery-agent-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryAgentService } from '../../services/delivery-agent.service';

@Component({
  selector: 'app-delivery-agent-profile',
  templateUrl: './delivery-agent-profile.component.html',
  styleUrls: ['./delivery-agent-profile.component.css']
})
export class DeliveryAgentProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deliveryAgentService: DeliveryAgentService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const agentProfile = this.deliveryAgentService.getCurrentAgent();
    if (agentProfile) {
      this.profileForm.patchValue(agentProfile);
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      // Handle profile update logic
      console.log('Profile Updated', this.profileForm.value);
    }
  }
}
