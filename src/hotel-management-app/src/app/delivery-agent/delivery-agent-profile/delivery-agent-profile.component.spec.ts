import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryAgentProfileComponent } from './delivery-agent-profile.component';
import { DeliveryAgentService } from '../../services/delivery-agent.service';
import { SharedModule } from '../../shared/shared.module';


describe('DeliveryAgentProfileComponent', () => {
  let component: DeliveryAgentProfileComponent;
  let fixture: ComponentFixture<DeliveryAgentProfileComponent>;
  let deliveryAgentService: jasmine.SpyObj<DeliveryAgentService>;

  beforeEach(async () => {
    const deliveryAgentServiceSpy = jasmine.createSpyObj('DeliveryAgentService', ['getCurrentAgent', 'updateAgent']);

    await TestBed.configureTestingModule({
      declarations: [ DeliveryAgentProfileComponent ],
      imports: [ ReactiveFormsModule, SharedModule],
      providers: [
        { provide: DeliveryAgentService, useValue: deliveryAgentServiceSpy }
      ]
    })
    .compileComponents();

    deliveryAgentService = TestBed.inject(DeliveryAgentService) as jasmine.SpyObj<DeliveryAgentService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAgentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load agent profile on component initialization', () => {
    const agentProfile = { name: 'John Doe', phone: '1234567890', email: 'johndoe@gmail.com'};
    deliveryAgentService.getCurrentAgent.and.returnValue(agentProfile);
  
    component.ngOnInit();
  
    expect(deliveryAgentService.getCurrentAgent).toHaveBeenCalled();
    expect(component.profileForm.value).toEqual(agentProfile);
  });

  it('should update agent profile when form is valid', () => {
    const updatedProfile = { name: 'Updated Name', phone: '9876543210', email: 'johndoe@gmail.com'};
    component.profileForm.setValue(updatedProfile);
  
    component.updateProfile();
  
    expect(component.profileForm.valid).toBeTruthy();
    expect(deliveryAgentService.updateAgent).toHaveBeenCalledWith(updatedProfile);
  });

  afterEach(() => {
    fixture.detectChanges();
    fixture.destroy();
  });
});
