import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantRegistrationComponent } from './registration.component';
import { RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockRestaurantService {
  addRestaurant(restaurant: any) {}
}

class MockCartService {
  getUserEmail() {
    return 'user@example.com';
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

class MockLocation {
  back() {}
}

describe('RestaurantRegistrationComponent', () => {
  let component: RestaurantRegistrationComponent;
  let fixture: ComponentFixture<RestaurantRegistrationComponent>;
  let mockRestaurantService: MockRestaurantService;
  let mockCartService: MockCartService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockRestaurantService = new MockRestaurantService();
    mockCartService = new MockCartService();
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [RestaurantRegistrationComponent],
      providers: [
        FormBuilder,
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required fields', () => {
    expect(component.restaurantForm.contains('name')).toBeTrue();
    expect(component.restaurantForm.contains('cuisine')).toBeTrue();
    expect(component.restaurantForm.contains('description')).toBeTrue();
    expect(component.restaurantForm.contains('image')).toBeTrue();
  });

  it('should require all form fields', () => {
    component.restaurantForm.patchValue({
      name: '',
      cuisine: '',
      description: '',
      image: ''
    });
    expect(component.restaurantForm.valid).toBeFalse();

    component.restaurantForm.patchValue({
      name: 'Restaurant A',
      cuisine: 'Italian',
      description: 'A nice restaurant',
      image: 'http://example.com/image.jpg'
    });
    expect(component.restaurantForm.valid).toBeTrue();
  });

  it('should call restaurantService.addRestaurant on registerRestaurant', () => {
    spyOn(mockRestaurantService, 'addRestaurant');
    component.restaurantForm.patchValue({
      name: 'Restaurant A',
      cuisine: 'Italian',
      description: 'A nice restaurant',
      image: 'http://example.com/image.jpg'
    });
    component.registerRestaurant();
    expect(mockRestaurantService.addRestaurant).toHaveBeenCalled();
  });

  it('should navigate to /owner-dashboard on successful registration', () => {
    component.restaurantForm.patchValue({
      name: 'Restaurant A',
      cuisine: 'Italian',
      description: 'A nice restaurant',
      image: 'http://example.com/image.jpg'
    });
    component.registerRestaurant();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner-dashboard']);
  });

  it('should display an alert if the form is not valid', () => {
    spyOn(window, 'alert');
    component.registerRestaurant();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields.');
  });

  it('should call location.back on goBack', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
