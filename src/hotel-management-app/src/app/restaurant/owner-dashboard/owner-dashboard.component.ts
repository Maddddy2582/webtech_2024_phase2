import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import { CartService } from '../../services/cart.service';
import { Location } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService,
    @Inject(Location) private location: Location
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    const currentUserEmail = this.cartService.getUserEmail();
    this.restaurants = this.restaurantService.getRestaurants().filter(
      restaurant => restaurant.userId === currentUserEmail
    );
  }

  goBack():void {
    this.location.back();
  }
}
