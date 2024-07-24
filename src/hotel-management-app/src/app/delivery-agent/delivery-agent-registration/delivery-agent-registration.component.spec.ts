import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAgentRegistrationComponent } from './delivery-agent-registration.component';

describe('DeliveryAgentRegistrationComponent', () => {
  let component: DeliveryAgentRegistrationComponent;
  let fixture: ComponentFixture<DeliveryAgentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAgentRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAgentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
