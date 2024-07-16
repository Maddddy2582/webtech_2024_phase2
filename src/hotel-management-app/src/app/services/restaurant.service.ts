import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private localStorageKey = 'restaurants' 

  constructor(private http: HttpClient) {
    this.initializeLocalStorage();
    // this.loadRestaurants();
  }

  initializeLocalStorage(){
    if (!localStorage.getItem(this.localStorageKey)) {
        this.loadInitialData().subscribe(restaurants => {
          localStorage.setItem(this.localStorageKey, JSON.stringify(restaurants));
        });
      }
  }

  loadInitialData(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('/assets/restaurants.json');
  }

//   private loadRestaurants(): void {
//     const storedRestaurants = localStorage.getItem('restaurants');
//     this.restaurants = storedRestaurants ? JSON.parse(storedRestaurants) : [];
//   }

//   private saveRestaurants(): void {
//     localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
//   }

  getRestaurants(): Restaurant[] {
    const storedRestaurants = localStorage.getItem(this.localStorageKey);
    return storedRestaurants ? JSON.parse(storedRestaurants) : [];
  }

  getRestaurantById(id: number): Restaurant | undefined{
    return this.getRestaurants().find(restaurant => restaurant.id === id);
  }

  addRestaurant(restaurant: Restaurant): void {
    const restaurants = this.getRestaurants();
    restaurant.id = restaurants.length + 1;
    restaurants.push(restaurant);
    localStorage.setItem(this.localStorageKey, JSON.stringify(restaurants));
  }

  addMenuItem(restaurantId: number, menuItem: MenuItem): void {
    const restaurants = this.getRestaurants();
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      menuItem.id = restaurant.menu.length ? Math.max(...restaurant.menu.map(m => m.id)) + 1 : 1; // Generate unique ID for menu item
      restaurant.menu.push(menuItem);
      localStorage.setItem(this.localStorageKey, JSON.stringify(restaurants));
    }
  }
  
}