import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentDetails = {
    cardholderName: '',
    cardNumber: '',
    cvv: '',
    expiryDate: ''
  };

  constructor(private router: Router, private customerService: CustomerService , private cartService: CartService) {}

  confirmPayment(): void {
    const userCart = this.cartService.getUserCartKey()
    // localStorage.setItem(userCart, JSON.stringify([]));
    localStorage.removeItem(userCart)
    alert("Payment Successful 🎉")
    this.router.navigate(['/dashboard']);
  }
}
