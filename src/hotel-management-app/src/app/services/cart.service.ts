import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { SalesService } from './sales.service';
import { Order, OrderItem } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey:string = 'cart'; 
  private userKey:string = 'currentCustomer';
  private cart: CartItem[] = [];
  private ordersKey = 'orders';

  constructor(private salesService: SalesService) {
    this.loadCart();
  }
  
  private loadCart(): void {
    const userCartKey = this.getUserCartKey();
    const savedCart = localStorage.getItem(userCartKey);
    this.cart = savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCart(): void {
    const userCartKey = this.getUserCartKey();
    localStorage.setItem(userCartKey, JSON.stringify(this.cart));
  }

  getUserEmail(): string {
    const user = JSON.parse(localStorage.getItem(this.userKey) || '{}');
    return user.email || '';
  }

  getUserCartKey(): string {
    const userEmail = this.getUserEmail();
    return `${this.cartKey}_${userEmail}`;
  }

  getCart(): CartItem[] {
    this.loadCart();
    return [...this.cart];
  }


  checkRestaurant(item: CartItem, id:number){
    if (this.cart.length == 0 ){
      this.addToCart(item,id)
    }
    else{
      if (this.cart[0].restaurantId == id){
        this.addToCart(item,id)
      }
      else{
        alert("Cannot add items from multiple restaurants :(")
      }
    }
  }

  addToCart(item: CartItem, id:number): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1, restaurantId: id });
    }
    this.saveCart();
  }

  removeFromCart(itemId: number): void {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  increaseQuantity(itemId: number): void {
    const item = this.cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity += 1;
      this.saveCart();
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.cart.find(cartItem => cartItem.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveCart(); 
    } else if (item && item.quantity === 1) {
      this.removeFromCart(itemId);
    }
  }

  processPayment(): void {
    const currentUserEmail = this.getUserEmail();
    const saleItems = this.cart.map(item => ({
      restaurantId: item.restaurantId,
      itemName: item.name,
      itemId: item.id,
      quantity: item.quantity,
      customerEmail: currentUserEmail,
      date: new Date()
    }));
    
    this.salesService.logSale(currentUserEmail, saleItems);
  }

  placeOrder(): void {
    const restaurantId = (this.cart[0].restaurantId);
    const userId = this.getUserEmail();
    const orderId = new Date().getTime();
    const orderItems: OrderItem[] = this.cart.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));
    const totalAmount = orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const newOrder: Order = {
      orderId,
      restaurantId,
      userId,
      items: orderItems,
      totalAmount,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    const savedOrders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
    savedOrders.push(newOrder);
    localStorage.setItem(this.ordersKey, JSON.stringify(savedOrders));

    this.clearCart();
  }

  getOrdersByRestaurant(restaurantId: number): Order[] {
    const savedOrders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
    return savedOrders.filter((order: Order) => order.restaurantId === restaurantId);
  }

  getOrdersByUser(userId: string): Order[] {
    const savedOrders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
    return savedOrders.filter((order: Order) => order.userId === userId);
  }

  markOrderAsCompleted(orderId:number){

  }

}
