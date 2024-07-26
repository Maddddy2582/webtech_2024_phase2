import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryAgentLoginComponent } from './delivery-agent-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryAgentService } from '../../services/delivery-agent.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';



describe('DeliveryAgentLoginComponent', () => {
  let component: DeliveryAgentLoginComponent;
  let fixture: ComponentFixture<DeliveryAgentLoginComponent>;
  let deliveryAgentService: jasmine.SpyObj<DeliveryAgentService>;
  let router: Router;

  beforeEach(async () => {
    const deliveryAgentServiceSpy = jasmine.createSpyObj('DeliveryAgentService', ['login']);
    await TestBed.configureTestingModule({
      declarations: [ DeliveryAgentLoginComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: DeliveryAgentService, useValue: deliveryAgentServiceSpy }
      ]

    })
    .compileComponents();

    deliveryAgentService = TestBed.inject(DeliveryAgentService) as jasmine.SpyObj<DeliveryAgentService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAgentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize form correctly', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });
  
  it('should mark email and password as invalid if empty', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');
  
    emailControl?.setValue('');
    passwordControl?.setValue('');
  
    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();
  });

  it('should login successfully and navigate to dashboard on valid credentials', () => {
    const email = 'test@example.com';
    const password = 'password123';
  
    deliveryAgentService.login.and.returnValue(true);
    spyOn(router, 'navigate');
  
    component.loginForm.setValue({ email, password });
    component.login();
  
    expect(deliveryAgentService.login).toHaveBeenCalledWith(email, password);
    expect(router.navigate).toHaveBeenCalledWith(['/delivery-agent/dashboard']);
  });
  
  it('should handle login failure correctly', () => {
    deliveryAgentService.login.and.returnValue(false);
  
    component.loginForm.setValue({ email: 'invalid@example.com', password: 'invalidpassword' });
    component.login();
  
    expect(component.loginFailed).toBeTruthy();
    expect(component.errorMessage).toEqual('Invalid email or password');
  });

  afterEach(() => {
    fixture.detectChanges();
    fixture.destroy();
  });
});
