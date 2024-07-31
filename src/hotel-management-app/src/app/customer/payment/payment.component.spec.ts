import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


class MockCartService {
  processPayment() {}
  placeOrder() {}
  getUserCartKey() {
    return 'mockCartKey';
  }
}

class MockRouter {
  navigate(commands: any[]) {
    return true;
  }
}

class MockLocation {
  back() {}
}

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let mockCartService: MockCartService;
  let mockRouter: MockRouter;
  let mockLocation: MockLocation;

  beforeEach(async () => {
    mockCartService = new MockCartService();
    mockRouter = new MockRouter();
    mockLocation = new MockLocation();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, SharedModule, BrowserAnimationsModule],
      declarations: [ PaymentComponent ],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct controls', () => {
    expect(component.paymentForm.contains('cardholderName')).toBeTrue();
    expect(component.paymentForm.contains('cardNumber')).toBeTrue();
    expect(component.paymentForm.contains('cvv')).toBeTrue();
    expect(component.paymentForm.contains('expiryDate')).toBeTrue();
  });

  it('should validate the form correctly', () => {
    const form = component.paymentForm;

    form.controls['cardholderName'].setValue('johnDoe');
    form.controls['cardNumber'].setValue('1234567812345678');
    form.controls['cvv'].setValue('123');
    form.controls['expiryDate'].setValue('12/25');

    expect(form.valid).toBeTrue();

    form.controls['cardholderName'].setValue('John Doe');
    form.controls['cardNumber'].setValue('1234'); // Invalid card number
    form.controls['cvv'].setValue('12'); // Invalid CVV
    form.controls['expiryDate'].setValue('1225'); // Invalid expiry date

    expect(form.valid).toBeFalse();
  });

  it('should call processPayment and placeOrder on confirmPayment if form is valid', () => {
    spyOn(mockCartService, 'processPayment');
    spyOn(mockCartService, 'placeOrder');
    spyOn(localStorage, 'setItem');
    spyOn(mockRouter, 'navigate');
    spyOn(window, 'alert');

    component.paymentForm.setValue({
      cardholderName: 'John Doe',
      cardNumber: '1234567812345678',
      cvv: '123',
      expiryDate: '12/25'
    });

    component.confirmPayment();

    expect(mockCartService.processPayment).toHaveBeenCalled();
    expect(mockCartService.placeOrder).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('mockCartKey', JSON.stringify([]));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(window.alert).toHaveBeenCalledWith('Payment Successful 🎉');
  });

  it('should navigate back on goBack', () => {
    spyOn(mockLocation, 'back');
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
