import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryAgentService } from '../../services/delivery-agent.service';
import { DeliveryAgent } from '../../models/delivery-agent.model';

@Component({
  selector: 'app-delivery-agent-profile',
  templateUrl: './delivery-agent-profile.component.html',
  styleUrls: ['./delivery-agent-profile.component.css']
})
export class DeliveryAgentProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private daProfileForm: FormBuilder,
    private deliveryAgentService: DeliveryAgentService
  ) {
    this.profileForm = this.daProfileForm.group({
      name: ['', Validators.required],
      email: [{ value: '' }, [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    }) as FormGroup & { Value: DeliveryAgent };
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
      this.deliveryAgentService.updateAgent(this.profileForm.value)
    }
  }
}
