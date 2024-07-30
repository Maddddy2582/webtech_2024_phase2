import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { SalesService } from './sales.service';
import { CartItem } from '../models/cart.model';
import { Order } from '../models/orders.model';

class MockSalesService {
  logSale(userEmail: string, saleItems: any[]): void {}
}

describe('CartService', () => {
  let service: CartService;
  let mockSalesService: jasmine.SpyObj<SalesService>;

  beforeEach(() => {
    mockSalesService = jasmine.createSpyObj('SalesService', ['logSale']);

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: SalesService, useValue: mockSalesService }
      ]
    });
    service = TestBed.inject(CartService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize cart from localStorage', () => {
    localStorage.setItem('cart_user@example.com', JSON.stringify([
      { id: 1, name: 'Item 1', price: 10, quantity: 1, restaurantId: 1 }
    ]));
    spyOn(service, 'getCart').and.returnValue(JSON.parse(localStorage.getItem('cart_user@example.com') || '[]'))
    const cart = service.getCart()
    expect(cart.length).toBe(1);
    expect(cart[0].name).toBe('Item 1');
  });

  it('should save cart to localStorage', () => {
    spyOn(service as any, 'saveCart').and.callThrough();
    service.addToCart({ id: 2, name: 'Item 2', price: 15 } as CartItem, 1);
    expect(service.getCart().length).toBe(1);
    expect(service.getCart()[0].name).toBe('Item 2');
  });

  it('should check restaurant and add item to cart', () => {
    service.addToCart({ id: 3, name: 'Item 3', price: 20 } as CartItem, 1);
    service.checkRestaurant({ id: 4, name: 'Item 4', price: 25 } as CartItem, 1);
    expect(service.getCart().length).toBe(2);
  });

  it('should alert if adding items from different restaurant', () => {
    spyOn(window, 'alert');
    service.addToCart({ id: 5, name: 'Item 5', price: 30 } as CartItem, 1);
    service.checkRestaurant({ id: 6, name: 'Item 6', price: 35 } as CartItem, 2);
    expect(window.alert).toHaveBeenCalledWith('Cannot add items from multiple restaurants :(');
  });

  it('should remove item from cart', () => {
    service.addToCart({ id: 7, name: 'Item 7', price: 40 } as CartItem, 1);
    service.removeFromCart(7);
    expect(service.getCart().length).toBe(0);
  });

  it('should clear the cart', () => {
    service.addToCart({ id: 8, name: 'Item 8', price: 45 } as CartItem, 1);
    service.clearCart();
    expect(service.getCart().length).toBe(0);
  });

  it('should increase item quantity', () => {
    service.addToCart({ id: 9, name: 'Item 9', price: 50 } as CartItem, 1);
    service.increaseQuantity(9);
    expect(service.getCart()[0].quantity).toBe(2);
  });

  it('should decrease item quantity', () => {
    service.addToCart({ id: 10, name: 'Item 10', price: 55 } as CartItem, 1);
    service.decreaseQuantity(10);
    expect(service.getCart().length).toBe(0);
  });

  it('should place an order', () => {
    service.addToCart({ id: 11, name: 'Item 11', price: 60 } as CartItem, 1);
    service.placeOrder();
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    expect(orders.length).toBe(1);
    expect(orders[0].items.length).toBe(1);
    expect(service.getCart().length).toBe(0);
  });

  it('should get orders by restaurant', () => {
    const order: Order = {
      orderId: 123,
      restaurantId: 1,
      userId: 'user@example.com',
      items: [{ id: 12, name: 'Item 12', quantity: 1, price: 65 }],
      totalAmount: 65,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    localStorage.setItem('orders', JSON.stringify([order]));
    const orders = service.getOrdersByRestaurant(1);
    expect(orders.length).toBe(1);
    expect(orders[0].restaurantId).toBe(1);
  });

  it('should get orders by user', () => {
    const order: Order = {
      orderId: 124,
      restaurantId: 2,
      userId: 'user@example.com',
      items: [{ id: 13, name: 'Item 13', quantity: 1, price: 70 }],
      totalAmount: 70,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    localStorage.setItem('orders', JSON.stringify([order]));
    const orders = service.getOrdersByUser('user@example.com');
    expect(orders.length).toBe(1);
    expect(orders[0].userId).toBe('user@example.com');
  });
});
