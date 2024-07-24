import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAgentDashboardComponent } from './delivery-agent-dashboard.component';

describe('DeliveryAgentDashboardComponent', () => {
  let component: DeliveryAgentDashboardComponent;
  let fixture: ComponentFixture<DeliveryAgentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAgentDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAgentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
