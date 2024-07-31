import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './navbar.component';
import { CustomerService } from '../../services/customer.service';
import { RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
// import { Image } from 'ol';

// Mock Services
class MockCustomerService {
  logout() {}
}

class MockRestaurantService {
  getRestaurants() {
    return [
      { 
        id: 1, 
        name: 'Restaurant A', 
        userId: 'user1',
        cuisine: 'Test cuisine',
        description: 'Test description',
        image: 'image.png',
        menu: [ ]
       },
      { id: 2, 
        name: 'Restaurant B', 
        userId: 'user2',
        cuisine: 'Test cuisine',
        description: 'Test description',
        image: 'image.png',
        menu: [ ] 
      }
    ];
  }
}

class MockCartService {
  getUserEmail() {
    return 'user1';
  }
}

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCustomerService: MockCustomerService;
  let mockRestaurantService: MockRestaurantService;
  let mockCartService: MockCartService;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCustomerService = new MockCustomerService();
    mockRestaurantService = new MockRestaurantService();
    mockCartService = new MockCartService();

    await TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule, BrowserAnimationsModule],
      declarations: [ NavBarComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter restaurants based on the current user', () => {
    const expectedRestaurants = [
      { 
        cuisine: 'Test cuisine',
        description: 'Test description',
        id: 1, 
        image: 'image.png',
        menu: [ ],
        name: 'Restaurant A', 
        userId: 'user1'
      }
    ];
    component.ngOnInit();
    expect(component.restaurants).toEqual(expectedRestaurants);
  });

  it('should emit search term on search', () => {
    spyOn(component.search, 'emit');
    component.searchTerm = 'search term';
    component.onSearch();
    expect(component.search.emit).toHaveBeenCalledWith('search term');
  });

  it('should navigate to home on navToHome call', () => {
    component.navToHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should navigate to cart on openCart call', () => {
    component.openCart();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cart']);
  });

  it('should navigate to profile on openProfile call', () => {
    component.openProfile();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should call logout on logout call', () => {
    spyOn(mockCustomerService, 'logout');
    component.logout();
    expect(mockCustomerService.logout).toHaveBeenCalled();
  });

  it('should navigate to order tracking on openTracking call', () => {
    component.openTracking();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/order-tracking']);
  });
});
