import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer.model';

class MockRouter {
  navigate(commands: any[]): void {}
}

describe('CustomerService', () => {
  let service: CustomerService;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        { provide: Router, useValue: mockRouter }
      ]
    });
    service = TestBed.inject(CustomerService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new customer', () => {
    const customer: Customer = {
      email: 'test@example.com',
      password: 'password123',
      id: 1,
      name: 'John Doe'
    };

    service.registerCustomer(customer);
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    expect(customers.length).toBe(1);
    expect(customers[0].email).toBe('test@example.com');
  });

  it('should not register a customer with an existing email', () => {
    const existingCustomer: Customer = {
      email: 'test@example.com',
      password: 'password123',
      id: 1,
      name: 'John Doe'
    };
    localStorage.setItem('customers', JSON.stringify([existingCustomer]));

    const newCustomer: Customer = {
      email: 'test@example.com',
      password: 'newpassword456',
            id: 1,
      name: 'John Doe'
    };

    const result = service.registerCustomer(newCustomer);
    expect(result).toBe('Email already exists');
  });

  it('should authenticate a customer with correct credentials', () => {
    const customer: Customer = {
      email: 'auth@example.com',
      password: 'authpassword',
            id: 1,
      name: 'John Doe'
    };
    localStorage.setItem('customers', JSON.stringify([customer]));

    const result = service.authenticateCustomer('auth@example.com', 'authpassword');
    expect(result).toBeTrue();
    expect(JSON.parse(localStorage.getItem('currentCustomer') || '{}').email).toBe('auth@example.com');
  });

  it('should not authenticate a customer with incorrect credentials', () => {
    const customer: Customer = {
      email: 'auth@example.com',
      password: 'authpassword',
            id: 1,
      name: 'John Doe'
    };
    localStorage.setItem('customers', JSON.stringify([customer]));

    const result = service.authenticateCustomer('auth@example.com', 'wrongpassword');
    expect(result).toBeFalse();
    expect(localStorage.getItem('currentCustomer')).toBeNull();
  });

  it('should get the current customer', () => {
    const customer: Customer = {
      email: 'current@example.com',
      password: 'currentpassword',
            id: 1,
      name: 'John Doe'
    };
    localStorage.setItem('currentCustomer', JSON.stringify(customer));

    const result = service.getCurrentCustomer();
    expect(result.email).toBe('current@example.com');
  });

  it('should log out the current customer', () => {
    const customer: Customer = {
      email: 'logout@example.com',
      password: 'logoutpassword',
            id: 1,
      name: 'John Doe'
    };
    localStorage.setItem('currentCustomer', JSON.stringify(customer));

    service.logout();
    expect(localStorage.getItem('currentCustomer')).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
