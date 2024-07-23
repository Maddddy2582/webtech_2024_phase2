import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import { CartService } from '../../services/cart.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {
  restaurants: Restaurant[] = [];
  showOptions: boolean = true;

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private router: Router
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

  editRestaurant(restaurant: Restaurant): void {
    this.router.navigate(['/edit-restaurant', restaurant.id]);
  }

  editMenuItem(restaurantId: number, itemId: number): void {
    this.router.navigate(['/edit-menu-item', restaurantId, itemId]);
  }

  deleteMenuItem(restaurantId:number , itemId: number){
    this.restaurantService.deleteMenu(restaurantId,itemId);
  }

  addMenuItem(restaurantId: number): void {
    this.router.navigate(['/add-menu-item', restaurantId]);
  }

  goBack():void {
    this.router.navigate(['/dashboard']);
  }

  deleteRestaurant(restaurant: Restaurant ): void{
    this.restaurantService.deleteRestaurant(restaurant);
  }

  viewSales(restaurantId: number): void {
    this.router.navigate(['/sales-analytics', restaurantId]);
  }

  navigateToOrderManagement(restaurantId: number): void {
    this.router.navigate(['/order-management', restaurantId]);
  }

  toggle(){
    this.showOptions = !this.showOptions
  }
}
