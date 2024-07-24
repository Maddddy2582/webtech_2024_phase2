import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAgentProfileComponent } from './delivery-agent-profile.component';

describe('DeliveryAgentProfileComponent', () => {
  let component: DeliveryAgentProfileComponent;
  let fixture: ComponentFixture<DeliveryAgentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAgentProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAgentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
