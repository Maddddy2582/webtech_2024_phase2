// src/app/delivery-agent/delivery-agent-dashboard/delivery-agent-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { deliveryOrder } from '../../models/deliveryorder.model';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-delivery-agent-dashboard',
  templateUrl: './delivery-agent-dashboard.component.html',
  styleUrls: ['./delivery-agent-dashboard.component.css']
})
export class DeliveryAgentDashboardComponent implements OnInit {
  orders: deliveryOrder[] = [];

  constructor(private orderService: OrderService, private restaurantService : RestaurantService) {}

  ngOnInit(): void {
    this.orders = this.orderService.getCompletedOrders();
  }

  acceptOrder(orderId: number): void {
    this.orderService.acceptOrder(orderId);
  }

  rejectOrder(orderId: number): void {
    this.orderService.rejectOrder(orderId);
    this.orders = this.orderService.getCompletedOrders();
  }

  markAsDelivered(orderId: number): void {
    this.orderService.markOrderAsDelivered(orderId);
  }

  getRestaurantName(id:number) : string | undefined{
    const restaurant=  this.restaurantService.getRestaurantNameById(id);
    return restaurant?.name
  }

  getCustomerName(userId: string): string | undefined{
    const customer = this.restaurantService.getCustomerName(userId)
    return customer?.name
  }
}
