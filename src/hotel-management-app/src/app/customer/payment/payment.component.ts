import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CartService } from '../../services/cart.service';
import { Location } from '@angular/common';

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

  constructor(private router: Router, private customerService: CustomerService , private cartService: CartService,private location : Location) {}

  confirmPayment(): void {
    const userCart = this.cartService.getUserCartKey()
    localStorage.removeItem(userCart)
    alert("Payment Successful 🎉")
    this.router.navigate(['/dashboard']);
  }

  goBack(): void{
    this.location.back();
  }
}
