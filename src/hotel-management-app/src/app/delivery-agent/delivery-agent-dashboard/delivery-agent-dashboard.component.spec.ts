import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryAgentDashboardComponent } from './delivery-agent-dashboard.component';
import { OrderService } from '../../services/order.service';
import { RestaurantService } from '../../services/restaurant.service';
import { of } from 'rxjs';
import { deliveryOrder } from '../../models/deliveryorder.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockOrderService {
  getCompletedOrders() {
    return of([
      {
        id: 1,
        orderId: 101,
        customerName: 'John Doe',
        restaurantName: 'The Gourmet Place',
        userId: 'user123',
        totalAmount: 250,
        items: [{ name: 'Pizza', quantity: 2 }],
        status: 'Pending',
      },
    ] as deliveryOrder[]);
  }

  acceptOrder(orderId: number) { }
  rejectOrder(orderId: number) { }
  markOrderAsDelivered(orderId: number) { }
}

class MockRestaurantService {
  getRestaurantNameById(id: number) {
    return { name: 'The Gourmet Place' };
  }

  getCustomerName(userId: string) {
    return { name: 'John Doe' };
  }
}

describe('DeliveryAgentDashboardComponent', () => {
  let component: DeliveryAgentDashboardComponent;
  let fixture: ComponentFixture<DeliveryAgentDashboardComponent>;
  let orderService: OrderService;
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAgentDashboardComponent],
      imports: [MatCardModule, MatButtonModule],
      providers: [
        { provide: OrderService, useClass: MockOrderService },
        { provide: RestaurantService, useClass: MockRestaurantService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAgentDashboardComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    restaurantService = TestBed.inject(RestaurantService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display orders on initialization', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.orders.length).toBe(1);
    expect(compiled.querySelector('.order-card')).toBeTruthy();
    expect(compiled.querySelector('p strong')?.textContent).toContain('Restaurant: ');
    expect(compiled.querySelector('h6 strong')?.textContent).toContain('Customer Name: ');
  });

  it('should call acceptOrder on the orderService when acceptOrder is called', () => {
    spyOn(orderService, 'acceptOrder').and.callThrough();
    component.acceptOrder(101);
    expect(orderService.acceptOrder).toHaveBeenCalledWith(101);
  });

  it('should call rejectOrder on the orderService when rejectOrder is called', () => {
    spyOn(orderService, 'rejectOrder').and.callThrough();
    component.rejectOrder(101);
    expect(orderService.rejectOrder).toHaveBeenCalledWith(101);
  });

  it('should call markOrderAsDelivered on the orderService when markAsDelivered is called', () => {
    spyOn(orderService, 'markOrderAsDelivered').and.callThrough();
    component.markAsDelivered(101);
    expect(orderService.markOrderAsDelivered).toHaveBeenCalledWith(101);
  });

  it('should return restaurant name from getRestaurantName method', () => {
    const name = component.getRestaurantName(1);
    expect(name).toBe('The Gourmet Place');
  });

  it('should return customer name from getCustomerName method', () => {
    const name = component.getCustomerName('user123');
    expect(name).toBe('John Doe');
  });
});
