import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private router: Router) { }

  register(customerData: any): string | void {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const existingCustomer = customers.find((c: any) => c.email === customerData.email);
    if (existingCustomer) {
      return 'Email already exists';
    }
    customers.push(customerData);
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  authenticate(email: string, password: string): boolean {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customer = customers.find((c: any) => c.email === email && c.password === password);
    if (customer) {
      localStorage.setItem('currentCustomer', JSON.stringify(customer));
      return true;
    }
    return false;
  }

  getCurrentCustomer(): any {
    return JSON.parse(localStorage.getItem('currentCustomer') || '{}');
  }

  logout(): void {
    localStorage.removeItem('currentCustomer');
    this.router.navigate(['/login']);
  }
}
