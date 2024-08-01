// src/app/components/order-management/order-management.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/orders.model';


@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html'
})
export class OrderManagementComponent implements OnInit {
  restaurantId!: number;
  orders: Order[] = [];
  orderStatus: string = 'pending' || 'Accepted' || 'Rejected' || 'Completed'

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.restaurantId = +(this.route.snapshot.paramMap.get('restaurantId') as string);
    this.orders = this.cartService.getOrdersByRestaurant(this.restaurantId);
  }

  goBack(): void {
    this.location.back();
  }

  updateOrderStatus(orderId: number,status: string): void {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = savedOrders.findIndex((order: Order) => order.orderId === orderId);
    if (orderIndex !== -1) {
      savedOrders[orderIndex].status = status;
      localStorage.setItem('orders', JSON.stringify(savedOrders));
      this.orders = savedOrders.filter((order: Order) => order.restaurantId === this.restaurantId);
    }
  }
}
