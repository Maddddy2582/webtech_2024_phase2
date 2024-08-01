import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { OrderService } from './order.service';
import { deliveryOrder } from '../models/deliveryorder.model';
import { of } from 'rxjs';

class MockLocation {
  go(path: string): void {}
}

describe('OrderService', () => {
  let service: OrderService;
  let mockLocation: jasmine.SpyObj<Location>;
  const order : deliveryOrder[] = [
    { id: 1, 
      status: 'Pending', 
      orderId: 101,
      restaurantId: 1,
      customerName: 'John Doe',
      restaurantName: 'Test Restaurant',
      userId: 'johndoe@gmail.com',
      totalAmount: 100,
      items: []
       },
  ];

  beforeEach(() => {
    mockLocation = jasmine.createSpyObj('Location', ['go']);

    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: Location, useValue: mockLocation }
      ]
    });
    service = TestBed.inject(OrderService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load orders from localStorage', () => {
    const orders: deliveryOrder[] = [
      { id: 1, 
        status: 'Pending', 
        orderId: 101,
        restaurantId: 1,
        customerName: 'John Doe',
        restaurantName: 'Test Restaurant',
        userId: 'johndoe@gmail.com',
        totalAmount: 100,
        items: []

     },
      { id: 2, 
        status: 'Completed', 
        orderId: 102,
        restaurantId: 1,
        customerName: 'John Doe',
        restaurantName: 'Test Restaurant',
        userId: 'johndoe@gmail.com',
        totalAmount: 100,
        items: [] }
    ];
    localStorage.setItem('orders', JSON.stringify(orders));
    spyOn(service , 'getOrders').and.returnValue(JSON.parse(localStorage.getItem('orders') || '[]'))
    
    const loadedOrders = service.getOrders();
    expect(loadedOrders.length).toBe(2);
    expect(loadedOrders[1].status).toBe('Completed');
  });

  it('should save orders to localStorage', () => {
    const orders: deliveryOrder[] = order
    service['orders'] = orders;
    service['saveOrders']();
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    expect(savedOrders.length).toBe(1);
    expect(savedOrders[0].status).toBe('Pending');
  });

  it('should get completed orders as Observable', (done: DoneFn) => {
    const orders: deliveryOrder[] = [
      { id: 1, status: 'Completed', orderId: 101,
        restaurantId: 1,
        customerName: 'John Doe',
        restaurantName: 'Test Restaurant',
        userId: 'johndoe@gmail.com',
        totalAmount: 100,
        items: []
       },
      { id: 2, status: 'Pending', orderId: 102,
        restaurantId: 1,
        customerName: 'John Doe',
        restaurantName: 'Test Restaurant',
        userId: 'johndoe@gmail.com',
        totalAmount: 100,
        items: []
       }
    ];
    service['orders'] = orders;
    
    service.getCompletedOrders().subscribe(completedOrders => {
      expect(completedOrders.length).toBe(1);
      expect(completedOrders[0].status).toBe('Completed');
      done();
    });
  });

  it('should mark an order as completed', () => {
    const orders: deliveryOrder[] = order
    service['orders'] = orders;
    service.markOrderAsCompleted(1);
    expect(service.getOrders()[0].status).toBe('Completed');
  });

  it('should accept an order', () => {
    const orders: deliveryOrder[] = order
    service['orders'] = orders;
    service.acceptOrder(101); 
    expect(service.getOrders()[0].status).toBe('Picked');
  });

  it('should reject an order', () => {
    const orders: deliveryOrder[] = order
    service['orders'] = orders;
    service.rejectOrder(101);    
    expect(service.getOrders()[0].status).toBe('Rejected');
  });

  it('should mark an order as delivered', () => {
    const orders: deliveryOrder[] = order
    service['orders'] = orders;
    service.markOrderAsDelivered(1);
    expect(service.getOrders().length).toBe(0);
  });
});
