import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';



@Component({
  selector: 'app-customer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customer: Customer | null = null;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.customer = this.customerService.getCurrentCustomer();
    if (!this.customer?.email) {
      this.router.navigate(['/login']);
    }
  }

  onLogout() {
    this.customerService.logout();
  }
}
