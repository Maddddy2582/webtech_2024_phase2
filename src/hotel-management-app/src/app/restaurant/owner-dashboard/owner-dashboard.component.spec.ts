import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { OwnerDashboardComponent } from './owner-dashboard.component';
import { RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';
import { Restaurant } from '../../models/restaurant.model';
import { SharedModule } from '../../shared/shared.module';


const mockRestaurants: Restaurant[] = [
  { id: 1, name: 'Restaurant A', userId: 'user1', cuisine: 'Italian', description: 'Description A', image: 'imageA.jpg', menu:[] },
  { id: 2, name: 'Restaurant B', userId: 'user1', cuisine: 'Chinese', description: 'Description B', image: 'imageB.jpg', menu:[] }
];

class MockRestaurantService {
  getRestaurants() {
    return [
      { id: 1, name: 'Restaurant A', userId: 'user1' },
      { id: 2, name: 'Restaurant B', userId: 'user1' }
    ];
  }

  deleteMenu(restaurantId: number, itemId: number) {}

  deleteRestaurant(restaurant: Restaurant) {}
}

class MockCartService {
  getUserEmail() {
    return 'user1';
  }
}

class MockRouter {
  navigate(path: (string |number)[]) {}
}

describe('OwnerDashboardComponent', () => {
  let component: OwnerDashboardComponent;
  let fixture: ComponentFixture<OwnerDashboardComponent>;
  let mockRestaurantService: MockRestaurantService;
  let mockCartService: MockCartService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRestaurantService = new MockRestaurantService();
    mockCartService = new MockCartService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [OwnerDashboardComponent],
      providers: [
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurants on initialization', () => {
    component.ngOnInit();
    expect(component.restaurants.length).toBe(2);
    expect(component.restaurants[0].name).toBe('Restaurant A');
  });

  it('should navigate to edit restaurant', () => {
    spyOn(mockRouter, 'navigate');
    const restaurant = mockRestaurants[0];
    component.editRestaurant(restaurant);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit-restaurant', restaurant.id]);
  });

  it('should navigate to edit menu item', () => {
    spyOn(mockRouter, 'navigate');
    const restaurantId = 1;
    const itemId = 2;
    component.editMenuItem(restaurantId, itemId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit-menu-item', 1, 2]);
  });

  it('should delete menu item', () => {
    spyOn(mockRestaurantService, 'deleteMenu');
    const restaurantId = 1;
    const itemId = 2;
    component.deleteMenuItem(restaurantId, itemId);
    expect(mockRestaurantService.deleteMenu).toHaveBeenCalledWith(restaurantId, itemId);
  });

  it('should navigate to add menu item', () => {
    spyOn(mockRouter, 'navigate');
    // const restaurantId = 1;
    component.addMenuItem(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/add-menu-item', 1]);
  });

  it('should delete restaurant', () => {
    spyOn(mockRestaurantService, 'deleteRestaurant');
    const restaurant = mockRestaurants[0];
    component.deleteRestaurant(restaurant);
    expect(mockRestaurantService.deleteRestaurant).toHaveBeenCalledWith(restaurant);
  });

  it('should navigate to view sales', () => {
    spyOn(mockRouter, 'navigate');
    const restaurantId = 1;
    component.viewSales(restaurantId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sales-analytics', restaurantId]);
  });

  it('should navigate to order management', () => {
    spyOn(mockRouter, 'navigate');
    const restaurantId = 1;
    component.navigateToOrderManagement(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/order-management', restaurantId]);
  });

  it('should toggle showOptions', () => {
    expect(component.showOptions).toBeTrue();
    component.toggle();
    expect(component.showOptions).toBeFalse();
    component.toggle();
    expect(component.showOptions).toBeTrue();
  });

  it('should navigate back to dashboard', () => {
    spyOn(mockRouter, 'navigate');
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
