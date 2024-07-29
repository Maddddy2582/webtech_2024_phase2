import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OrderTrackingComponent } from './order-tracking.component';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/orders.model';
import { SharedModule } from '../../shared/shared.module';


class MockCartService {
  getUserEmail() {
    return 'test@example.com';
  }

  getOrdersByUser(userId: string): Order[] {
    return [
      { 
        orderId: 1,
        restaurantId: 101,
        userId: 'test@example.com',
        items: [
          { id: 1, name: 'Burger', quantity: 2, price: 5.00 }
        ],
        totalAmount: 10.00,
        date: new Date().toISOString(),
        status: 'Pending'
      }
    ];
  }
}

class MockRouter {
  navigate(commands: any[]) {
    return true;
  }
}

describe('OrderTrackingComponent', () => {
  let component: OrderTrackingComponent;
  let fixture: ComponentFixture<OrderTrackingComponent>;
  let mockCartService: MockCartService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockCartService = new MockCartService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ OrderTrackingComponent ],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userId and orders on ngOnInit', () => {
    const expectedOrders: Order[] = [
      { 
        orderId: 1,
        restaurantId: 101,
        userId: 'test@example.com',
        items: [
          { id: 1, name: 'Burger', quantity: 2, price: 5.00 }
        ],
        totalAmount: 10.00,
        date: new Date().toISOString(),
        status: 'Pending'
      }
    ];
    
    component.ngOnInit();
    expect(component.userId).toBe('test@example.com');
    expect(component.orders).toEqual(expectedOrders);
  });

  it('should navigate to dashboard on goBack', () => {
    spyOn(mockRouter, 'navigate');
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
