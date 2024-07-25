import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let customerService: CustomerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        CustomerService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call authenticateCustomer if loginForm is invalid', () => {
    const mockLoginForm = jasmine.createSpyObj<FormGroup>(
      'FormGroup', [], { valid: false }
    );
    component.loginForm = mockLoginForm;

    component.onLogin();

    expect(customerService.authenticateCustomer).not.toHaveBeenCalled();
  })
});
