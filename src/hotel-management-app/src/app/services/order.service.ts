// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { deliveryOrder } from '../models/deliveryorder.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersKey = 'orders';
  private orders: deliveryOrder[] = [];

  constructor() {
    this.loadOrders();
  }

  private loadOrders(): void {
    const savedOrders = localStorage.getItem(this.ordersKey);
    this.orders = savedOrders ? JSON.parse(savedOrders) : [];
  }

  private saveOrders(): void {
    localStorage.setItem(this.ordersKey, JSON.stringify(this.orders));
  }

  getOrders(): deliveryOrder[] {
    return this.orders;
  }

  getCompletedOrders(): deliveryOrder[] {
    return this.orders.filter(order => order.status === 'Completed');
  }

  markOrderAsCompleted(orderId: number): void {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = 'Completed';
      this.saveOrders();
    }
  }

  acceptOrder(orderId: number): void {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = 'Accepted';
      this.saveOrders();
    }
  }

  rejectOrder(orderId: number): void {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = 'Rejected';
      this.saveOrders();
    }
  }

  markOrderAsDelivered(orderId: number): void {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = 'Delivered';
      this.saveOrders();
    }
  }
}
