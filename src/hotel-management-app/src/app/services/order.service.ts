import { Injectable } from '@angular/core';
import { deliveryOrder } from '../models/deliveryorder.model';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersKey = 'orders';
  private orders: deliveryOrder[] = [];
  

  constructor(private location : Location) {
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

  getCompletedOrders(): Observable<deliveryOrder[]> {
    const orders: deliveryOrder[] = this.orders.filter(order => order.status === 'Completed' || order.status === 'Picked'); // Replace with actual data
    return of(orders); // Return an observable
  }

  markOrderAsCompleted(orderId: number): void {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = 'Completed';
      this.saveOrders();
    }
  }

  acceptOrder(orderId: number): void {
    const order = this.orders.find(order => order.orderId === orderId);
    if (order) {
      order.status = 'Picked';
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
    const index = this.getOrders()?.findIndex(item => item.orderId === orderId);
    this.getOrders().splice(index,1)
    this.saveOrders()
    this.location.go(this.location.path());
    window.location.reload();
  }
}
