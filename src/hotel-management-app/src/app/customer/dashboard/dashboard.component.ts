import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  restaurants:  Restaurant[] = [];
  filteredRestaurants:  Restaurant[] = [];

  constructor( private router : Router){}
  ngOnInit(): void {
    this.restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
    .map((restaurant:  Restaurant) => {
      return {
        ...restaurant,
      };
    });

    this.filteredRestaurants = [...this.restaurants];
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
