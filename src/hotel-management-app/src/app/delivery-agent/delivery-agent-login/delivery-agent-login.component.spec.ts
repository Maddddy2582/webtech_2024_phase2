import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAgentLoginComponent } from './delivery-agent-login.component';

describe('DeliveryAgentLoginComponent', () => {
  let component: DeliveryAgentLoginComponent;
  let fixture: ComponentFixture<DeliveryAgentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAgentLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAgentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
