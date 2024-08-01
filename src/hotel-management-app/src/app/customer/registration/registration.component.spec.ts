import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { CustomerService } from '../../services/customer.service';
import { SharedModule } from '../../shared/shared.module';

class MockCustomerService {
  registerCustomer() {
    return 'Registration successful';
  }
}

class MockRouter {
  navigate(commands: any[]) {
    return true;
  }
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockCustomerService: MockCustomerService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockCustomerService = new MockCustomerService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SharedModule],
      declarations: [RegistrationComponent],
      providers: [
        FormBuilder,
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registration form with empty values', () => {
    expect(component.registrationForm.value).toEqual({
      name: '',
      email: '',
      password: ''
    });
  });

  it('should show error message if email already exists', () => {
    spyOn(mockCustomerService, 'registerCustomer').and.returnValue('Email already exists');
    component.registrationForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
    component.onSubmit();
    expect(component.errorMessage).toBe('Email already exists');
    expect(component.successMessage).toBeNull();
  });

  it('should show success message and navigate to login on successful registration', () => {
    spyOn(mockCustomerService, 'registerCustomer').and.returnValue('Registration successful');
    spyOn(mockRouter, 'navigate');
    component.registrationForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
    component.onSubmit();
    expect(component.successMessage).toBe('Registration successful');
    expect(component.errorMessage).toBeNull();
    expect(component.registrationForm.value).toEqual({
      name: null,
      email: null,
      password: null
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

});
