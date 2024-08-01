import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { CartItem } from '../../models/cart.model';
import { SharedModule } from '../../shared/shared.module';

class MockCartService {
  private cart: CartItem[] = [
    {  id: 1,
       name: 'Item 1', 
       price: 100, 
       quantity: 2,
       restaurantId: 1,
       description: 'Test description',
       imagePath: 'image.png' },
    { id: 2, 
      name: 'Item 2', 
      price: 50, 
      quantity: 1,
      restaurantId: 1,
      description: 'Test description',
      imagePath: 'image.png' }
  ];

  getCart() {
    return this.cart;
  }

  removeFromCart(itemId: number) {
    this.cart = this.cart.filter(item => item.id !== itemId);
  }

  clearCart() {
    this.cart = [];
  }

  increaseQuantity(itemId: number) {
    const item = this.cart.find(i => i.id === itemId);
    if (item) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(itemId: number) {
    const item = this.cart.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
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

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: MockCartService;
  let mockRouter: MockRouter;
  let mockLocation: MockLocation;

  beforeEach(async () => {
    mockCartService = new MockCartService();
    mockRouter = new MockRouter();
    mockLocation = new MockLocation();

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items on init', () => {
    component.ngOnInit();
    expect(component.cartItems.length).toBe(2);
    expect(component.totalAmount).toBe(250);
  });

  it('should remove item from cart', () => {
    component.removeItem(1);
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].id).toBe(2);
  });

  it('should clear the cart', () => {
    component.clearCart();
    expect(component.cartItems.length).toBe(0);
  });

  it('should increase item quantity', () => {
    component.increaseQuantity(1);
    expect(component.cartItems.find(item => item.id === 1)?.quantity).toBe(3);
  });

  it('should decrease item quantity', () => {
    component.decreaseQuantity(1);
    expect(component.cartItems.find(item => item.id === 1)?.quantity).toBe(1);
  });

  it('should calculate the total amount', () => {
    component.calculateTotal();
    expect(component.totalAmount).toBe(250);
  });

  it('should navigate to payment', () => {
    spyOn(mockRouter, 'navigate');
    component.goToPayment();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/payment']);
  });

  it('should go back to the previous page', () => {
    spyOn(mockLocation, 'back');
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
