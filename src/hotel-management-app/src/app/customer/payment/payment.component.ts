import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentForm: FormGroup;
   constructor(
    private router: Router, 
    private cartService: CartService,
    private location: Location,
    private paymentFormBuild: FormBuilder) {
      this.paymentForm = this.paymentFormBuild.group({
        cardholderName: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
        expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]]
      });
    }

  confirmPayment(): void {
    if (this.paymentForm.valid) {
      const userCart = this.cartService.getUserCartKey()
      localStorage.setItem(userCart, JSON.stringify([]));
      alert("Payment Successful 🎉")
      this.router.navigate(['/dashboard']);
    }
  }

  goBack(){
    this.location.back();
  }
}
