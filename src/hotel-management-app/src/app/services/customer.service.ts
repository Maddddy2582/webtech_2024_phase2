import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private router: Router) { }
  
  registerCustomer(customerData: Customer): string | void {
    const customers: Customer[] = JSON.parse(localStorage.getItem('customers') || '[]');
    const existingCustomer: Customer | undefined = customers.find((c: Customer) => c.email === customerData.email);
    if (existingCustomer) {
      return 'Email already exists';
    }
    customers.push(customerData);
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  authenticateCustomer(email: string, password: string): boolean {
    const customers: Customer[] = JSON.parse(localStorage.getItem('customers') || '[]');
    const customer: Customer | undefined = customers.find((c: Customer) => c.email === email && c.password === password);
    if (customer) {
      localStorage.setItem('currentCustomer', JSON.stringify(customer));
      return true;
    }
    return false;
  }

  getCurrentCustomer(): Customer {
    return JSON.parse(localStorage.getItem('currentCustomer') || '{}');
  }

  logout(): void {
    localStorage.removeItem('currentCustomer');
    this.router.navigate(['/login']);
  }
}
