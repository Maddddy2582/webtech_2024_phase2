import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryAgentRegistrationComponent } from './delivery-agent-registration.component';
import { DeliveryAgentService } from '../../services/delivery-agent.service';
import { DeliveryAgent } from '../../models/delivery-agent.model';

describe('DeliveryAgentRegistrationComponent', () => {
  let component: DeliveryAgentRegistrationComponent;
  let fixture: ComponentFixture<DeliveryAgentRegistrationComponent>;
  let mockDeliveryAgentService: jasmine.SpyObj<DeliveryAgentService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spyDeliveryAgentService = jasmine.createSpyObj('DeliveryAgentService', ['registerAgent']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DeliveryAgentRegistrationComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: DeliveryAgentService, useValue: spyDeliveryAgentService },
        { provide: Router, useValue: spyRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryAgentRegistrationComponent);
    component = fixture.componentInstance;
    mockDeliveryAgentService = TestBed.inject(DeliveryAgentService) as jasmine.SpyObj<DeliveryAgentService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.registrationForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890'
    });
    expect(component.registrationForm.valid).toBeTrue();
  });

  it('should display an error message if the registration fails due to existing email', () => {
    const newAgent: DeliveryAgent = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890'
    };
    mockDeliveryAgentService.registerAgent.and.returnValue(false);

    component.registrationForm.setValue(newAgent);
    component.register();

    expect(component.successMessage).toBeNull();
    expect(component.errorMessage).toEqual('Email already exists');
    expect(component.registrationFailed).toBeTrue();
  });

  it('should navigate to login page on successful registration', () => {
    const newAgent: DeliveryAgent = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890'
    };
    mockDeliveryAgentService.registerAgent.and.returnValue(true);

    component.registrationForm.setValue(newAgent);
    component.register();

    expect(component.errorMessage).toBeNull();
    expect(component.successMessage).toEqual('Registration Successful');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/delivery-agent/login']);
  });

  it('should display an error message if the form is invalid', () => {
    component.registrationForm.setValue({
      name: '',
      email: 'invalidemail',
      password: '',
      phone: ''
    });
    component.register();

    expect(component.successMessage).toBeNull();
    expect(component.errorMessage).toBeNull();
    expect(component.registrationFailed).toBeFalse();
  });
});
