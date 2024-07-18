import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { SalesService } from './sales.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private userKey = 'currentCustomer';
  private cart: CartItem[] = [];

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

  addToCart(item: CartItem, id:number): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      console.log(item);
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
    console.log(this.cart);
    console.log(currentUserEmail);
    const saleItems = this.cart.map(item => ({
      restaurantId: item.restaurantId,
      itemName: item.name,
      itemId: item.id,
      quantity: item.quantity,
      customerEmail: currentUserEmail,
      date: new Date()
    }));
    
    this.salesService.logSale(currentUserEmail, saleItems);
    this.clearCart();
  }

}
