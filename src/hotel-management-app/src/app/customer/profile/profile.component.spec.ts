import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { CustomerService } from '../../services/customer.service';
import { of } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { SharedModule } from '../../shared/shared.module';


class MockCustomerService {
  getCurrentCustomer() {
    return { email: 'test@example.com', name: 'John Doe' } as Customer;
  }

  logout() {}
}

class MockRouter {
  navigate(commands: any[]) {
    return true;
  }
}

class MockLocation {
  back() {}
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockCustomerService: MockCustomerService;
  let mockRouter: MockRouter;
  let mockLocation: MockLocation;

  beforeEach(async () => {
    mockCustomerService = new MockCustomerService();
    mockRouter = new MockRouter();
    mockLocation = new MockLocation();

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ ProfileComponent],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if no customer email', () => {
    spyOn(mockCustomerService, 'getCurrentCustomer').and.returnValue({ email: '', name: 'John Doe' } as Customer);
    spyOn(mockRouter, 'navigate');

    component.ngOnInit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not redirect if customer email is present', () => {
    spyOn(mockCustomerService, 'getCurrentCustomer').and.returnValue({ email: 'test@example.com', name: 'John Doe' } as Customer);
    spyOn(mockRouter, 'navigate');

    component.ngOnInit();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to restaurant registration on navToResRegister call', () => {
    spyOn(mockRouter, 'navigate');
    component.navToResRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register-restaurant']);
  });

  it('should call logout on onLogout call', () => {
    spyOn(mockCustomerService, 'logout');
    component.onLogout();
    expect(mockCustomerService.logout).toHaveBeenCalled();
  });

  it('should navigate back on goBack call', () => {
    spyOn(mockLocation, 'back');
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
