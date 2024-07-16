import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RestaurantRegistrationComponent {
  restaurant: Restaurant = {
    id: 0,
    name: '',
    cuisine: '',
    image: '',
    description: '',
    menu: [],
    userId: ''
  };
  constructor(private restaurantService: RestaurantService, private router: Router, private cartService: CartService) {}

  addMenuItem(): void {
    this.restaurant.menu.push({ id: 0, name: '', description: '', price: 0, imagePath:' '});
  }

  removeMenuItem(index: number): void {
    this.restaurant.menu.splice(index, 1);
  }

  registerRestaurant(): void {
    this.restaurant.userId = this.cartService.getUserEmail();
    this.restaurantService.addRestaurant(this.restaurant);
    alert('Restaurant registered successfully!');
    this.router.navigate(['/owner-dashboard']);
  }
}
