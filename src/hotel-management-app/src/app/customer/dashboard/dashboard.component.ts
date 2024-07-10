import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  restaurants:  Restaurant[] = [];
  filteredRestaurants:  Restaurant[] = [];
  searchTerm: string = '';
  ngOnInit(): void {
    this.restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
    .map((restaurant:  Restaurant) => {
      return {
        ...restaurant,
      };
    });

    this.filteredRestaurants = [...this.restaurants];
  }

  filterRestaurants(): void {
    console.log(this.searchTerm);
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
