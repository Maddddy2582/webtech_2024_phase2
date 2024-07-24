// src/app/components/order-tracking/order-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/orders.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  userId: string;
  orders: Order[] = [];

  constructor(private cartService: CartService, private router:Router) {
    this.userId = this.cartService.getUserEmail();
  }

  ngOnInit(): void {
    this.orders = this.cartService.getOrdersByUser(this.userId);
  }

  goBack(){
    this.router.navigate(['/dashboard'])
  }
}
