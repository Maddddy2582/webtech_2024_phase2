import { TestBed } from '@angular/core/testing';
import { Sale } from '../models/salesInfo.model';
import { SalesService } from './sales.service';

describe('SalesService', () => {
  let service: SalesService;


  const mockSales: { [key: string]: Sale[] } = {
    'customer1@example.com': [
      { restaurantId: 1, itemName: 'Item 1', itemId: 101, quantity: 2, date: new Date('2024-07-01'), customerEmail: 'customer1@example.com' },
      { restaurantId: 2, itemName: 'Item 2', itemId: 102, quantity: 1, date: new Date('2024-07-02'), customerEmail: 'customer1@example.com' }
    ],
    'customer2@example.com': [
      { restaurantId: 1, itemName: 'Item 3', itemId: 103, quantity: 3, date: new Date('2024-07-01'), customerEmail: 'customer2@example.com' }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesService]
    });

    service = TestBed.inject(SalesService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty sales data if localStorage is empty', () => {
    service['loadSales']();
    expect(service['sales']).toEqual({});
  });

  it('should log sales for a user correctly', () => {
    service['sales'] = {};
    service.logSale('customer1@example.com', mockSales['customer1@example.com']);
    const allSales = JSON.parse(localStorage.getItem('sales') || '{}');
    const dates = allSales['customer1@example.com'][0].date;
    const actualdate = mockSales['customer1@example.com'][0].date.toISOString()
    expect(allSales['customer1@example.com'][0].date).toEqual(actualdate);
  });

  it('should get sales by restaurant ID correctly', () => {
    service['sales'] = mockSales;
    const salesByRestaurant = service.getSalesByRestaurant(1);
    expect(salesByRestaurant.length).toBe(2);
    expect(salesByRestaurant[0].itemName).toBe('Item 1');
    expect(salesByRestaurant[1].itemName).toBe('Item 3');
  });

  it('should return an empty array if no sales match the restaurant ID', () => {
    service['sales'] = mockSales;
    const salesByRestaurant = service.getSalesByRestaurant(999); // Non-existing restaurant ID
    expect(salesByRestaurant).toEqual([]);
  });

  it('should handle sales with multiple items and multiple users', () => {
    service['sales'] = mockSales;
    const salesByRestaurant1 = service.getSalesByRestaurant(1);
    expect(salesByRestaurant1.length).toBe(2);
    const salesByRestaurant2 = service.getSalesByRestaurant(2);
    expect(salesByRestaurant2.length).toBe(1);
    expect(salesByRestaurant2[0].itemName).toBe('Item 2');
  });
});
