import { of } from 'rxjs';
import { CartItem } from '../models/cart.model';

export class CartServiceMock {
  private cart: CartItem[] = [];

  getCart() {
    return [...this.cart];
  }

  getUserEmail(){
    return 'johndoe@gmail.com'
  }

  addToCart(item: CartItem, id: number): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1, restaurantId: id });
    }
  }

  removeFromCart(itemId: number): void {
    this.cart = this.cart.filter(item => item.id !== itemId);
  }

  clearCart(): void {
    this.cart = [];
  }

  increaseQuantity(itemId: number): void {
    const item = this.cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.cart.find(cartItem => cartItem.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else if (item && item.quantity === 1) {
      this.removeFromCart(itemId);
    }
  }

  processPayment(): void {}

  placeOrder(): void {}

  getOrdersByRestaurant(restaurantId: number): any[] {
    return [];
  }

  getOrdersByUser(userId: string): any[] {
    return [];
  }

  checkRestaurant(item: CartItem, id: number): void {
    if (this.cart.length === 0) {
      this.addToCart(item, id);
    } else {
      if (this.cart[0].restaurantId === id) {
        this.addToCart(item, id);
      } else {
        spyOn(window, 'alert');
        expect(window.alert).toHaveBeenCalledWith('Cannot add items from multiple restaurants :(');
      }
    }
  }
}
