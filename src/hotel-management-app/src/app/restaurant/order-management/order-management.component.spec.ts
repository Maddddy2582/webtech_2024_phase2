import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { OrderManagementComponent } from './order-management.component';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/orders.model';
import { SharedModule } from '../../shared/shared.module';

// Define the exact order type
interface MockOrder extends Order {
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed' | 'Delivered' | 'Picked';
}

// Mock CartService
class MockCartService {
  getOrdersByRestaurant(restaurantId: number): MockOrder[] {
    return [
      { orderId: 1, restaurantId, status: 'Pending', items: [], userId: 'user1', totalAmount: 100, date: '2024-07-26' },
      { orderId: 2, restaurantId, status: 'Accepted', items: [], userId: 'user2', totalAmount: 150, date: '2024-07-26' }
    ];
  }

  markOrderAsCompleted(orderId: number) {}
}

// Mock ActivatedRoute
class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => {
        if (key === 'restaurantId') return '1';
        return null;
      }
    }
  };
}

// Mock Location
class MockLocation {
  back() {}
}

describe('OrderManagementComponent', () => {
  let component: OrderManagementComponent;
  let fixture: ComponentFixture<OrderManagementComponent>;
  let mockCartService: MockCartService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockLocation: MockLocation;

  beforeEach(async () => {
    mockCartService = new MockCartService();
    mockActivatedRoute = new MockActivatedRoute();
    mockLocation = new MockLocation();

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [OrderManagementComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with orders for the given restaurantId', () => {
    const expectedOrders: MockOrder[] = [
      { orderId: 1, restaurantId: 1, status: 'Pending', items: [], userId: 'user1', totalAmount: 100, date: '2024-07-26' },
      { orderId: 2, restaurantId: 1, status: 'Accepted', items: [], userId: 'user2', totalAmount: 150, date: '2024-07-26' }
    ];
    expect(component.orders).toEqual(expectedOrders);
  });

  it('should call location.back() on goBack', () => {
    spyOn(mockLocation, 'back');

    component.goBack();

    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should update the order status and store in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([
      { orderId: 1, restaurantId: 1, status: 'Pending', items: [], userId: 'user1', totalAmount: 100, date: '2024-07-26' },
      { orderId: 2, restaurantId: 1, status: 'Accepted', items: [], userId: 'user2', totalAmount: 150, date: '2024-07-26' }
    ]));
    spyOn(localStorage, 'setItem');
    spyOn(mockCartService, 'markOrderAsCompleted');

    component.updateOrderStatus(1, 'Completed');

    expect(mockCartService.markOrderAsCompleted).toHaveBeenCalledWith(1);
    const updatedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    expect(updatedOrders[0].status).toBe('Pending');
  });

  it('should filter orders by restaurantId after updating status', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([
      { orderId: 1, restaurantId: 1, status: 'Pending', items: [], userId: 'user1', totalAmount: 100, date: '2024-07-26' },
      { orderId: 2, restaurantId: 2, status: 'Accepted', items: [], userId: 'user2', totalAmount: 150, date: '2024-07-26' }
    ]));
    spyOn(localStorage, 'setItem');

    component.updateOrderStatus(1, 'Rejected');

    expect(component.orders).toEqual([
      { orderId: 1, restaurantId: 1, status: 'Rejected', items: [], userId: 'user1', totalAmount: 100, date: '2024-07-26' }
    ]);
  });
});
