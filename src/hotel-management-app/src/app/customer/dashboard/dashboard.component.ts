import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  restaurants:  Restaurant[] = [];
  filteredRestaurants:  Restaurant[] = [];

  constructor( private router : Router, private restaurantService: RestaurantService){}
  ngOnInit(): void {
    this.loadRestaurants();
    this.filteredRestaurants = [...this.restaurants];
  }

  loadRestaurants(): void{
    this.restaurants = this.restaurantService.getRestaurants();
  }

  filterRestaurants(searchTerm:String): void {
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  viewMenu(restaurantId: number): void {
    this.router.navigate(['/menu', restaurantId]);
  }
}
