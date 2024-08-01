import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { Location } from '@angular/common';



@Component({
  selector: 'app-customer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customer: Customer | null = null;

  constructor(private customerService: CustomerService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.customer = this.customerService.getCurrentCustomer();
    if (!this.customer?.email) {
      this.router.navigate(['/login']);
    }
  }

  navToResRegister(){
    this.router.navigate(['/register-restaurant'])
  }

  onLogout() {
    this.customerService.logout();
  }

  goBack(): void {
    this.location.back();
  }


}
