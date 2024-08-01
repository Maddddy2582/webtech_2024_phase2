import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { CustomerService } from '../../services/customer.service';

class MockCustomerService {
  authenticateCustomer(email: string, password: string) {
    return email === 'test@example.com' && password === 'password123';
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let customerService: CustomerService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CustomerService, useClass: MockCustomerService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should make the email control required and validate email format', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should make the password control required', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
    passwordControl?.setValue('password123');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should authenticate and navigate on valid login', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should display error message on invalid login', () => {
    component.loginForm.setValue({ email: 'wrong@example.com', password: 'wrongpassword' });
    component.onLogin();
    expect(component.errorMessage).toBe('Invalid email or password');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});