import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router : Router, private location : Location) {}

  ngOnInit(): void {
    this.loadCart();
    this.calculateTotal();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
    this.calculateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
    this.calculateTotal();
  }

  increaseQuantity(itemId: number): void {
    this.cartService.increaseQuantity(itemId);
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  decreaseQuantity(itemId: number): void {
    this.cartService.decreaseQuantity(itemId);
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  goToPayment(): void {
    this.router.navigate(['/payment']);
  }

  goBack(): void {
    this.location.back();
  }
}
