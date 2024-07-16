import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  addRestaurant(restaurant: Restaurant): void {
    const restaurants = this.getRestaurants();
    restaurant.id = restaurants.length + 1;
    restaurants.push(restaurant);
    localStorage.setItem(this.localStorageKey, JSON.stringify(restaurants));
  }

  
}