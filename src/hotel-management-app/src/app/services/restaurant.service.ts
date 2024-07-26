import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu.model';
import { Location } from '@angular/common';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private localStorageKey: string = 'restaurants' 

  constructor(private http: HttpClient, private location : Location) {
    this.initializeLocalStorage();
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

  getRestaurants(): Restaurant[] {
    const storedRestaurants = localStorage.getItem(this.localStorageKey);
    return storedRestaurants ? JSON.parse(storedRestaurants) : [];
  }

  getCustomers(): Customer[] {
    const storedCustomers = localStorage.getItem('customers')
    return storedCustomers ? JSON.parse(storedCustomers) : []
  }

  getRestaurantById(id: number): Restaurant | undefined{
    return this.getRestaurants().find(restaurant => restaurant.id === id);
  }

  getRestaurantNameById(id:number): Restaurant | undefined{
    const searchedRes = this.getRestaurants().find(restaurant => restaurant.id === id)
    return searchedRes
  }

  getCustomerName(userId: string){
    return this.getCustomers().find(customer => customer.email === userId);
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
      menuItem.id = restaurant.menu.length ? Math.max(...restaurant.menu.map(m => m.id)) + 1 : 1;
      restaurant.menu.push(menuItem);
      localStorage.setItem(this.localStorageKey, JSON.stringify(restaurants));
    }
  }

  getMenuItems(restaurantId: number): MenuItem[] {
    const restaurant = this.getRestaurants().find(r => r.id === restaurantId);
    return restaurant?.menu || [];
  }

  getMenuItem(restaurantId: number, itemId: number): MenuItem | undefined {
    return this.getMenuItems(restaurantId)?.find(item => item.id === itemId);
  }

  updateRestaurant(updatedRestaurant: Restaurant): void {
    const index = this.getRestaurants().findIndex(r => r.id === updatedRestaurant.id);
    if (index !== -1) {
      const allRestaurant = this.getRestaurants();
      allRestaurant[index] = updatedRestaurant;
      localStorage.setItem(this.localStorageKey, JSON.stringify(allRestaurant));
    }
  }

  updateMenuItem(restaurantId: number, updatedMenuItem: MenuItem): void {
    const restaurants = this.getRestaurants();
    const index = this.getMenuItems(restaurantId)?.findIndex(item => item.id === updatedMenuItem.id);
    if (index !== -1) {
      restaurants[restaurantId-1].menu[index] = updatedMenuItem;
      localStorage.setItem(this.localStorageKey, JSON.stringify(restaurants));
    }
  }

  getRestaurantsByOwner(ownerEmail: string): Restaurant[] {
    return this.getRestaurants().filter(restaurant => restaurant.userId === ownerEmail);
  }

  deleteMenu(restaurantId:number ,deleteitemId: number): void{
    const restaurants = this.getRestaurants();
    const index = this.getMenuItems(restaurantId)?.findIndex(item => item.id === deleteitemId);
    restaurants[restaurantId-1].menu.splice(index,1)
    localStorage.setItem(this.localStorageKey, JSON.stringify(restaurants));
    this.location.go(this.location.path());
    window.location.reload();
  }

  deleteRestaurant(restaurant:Restaurant):void{
    const index = this.getRestaurants().findIndex(r => r.id === restaurant.id);
    const restaurants = this.getRestaurants();
    restaurants.splice(index,1)
    localStorage.setItem(this.localStorageKey, JSON.stringify(restaurants));
    this.location.go(this.location.path());
    window.location.reload();
  }
}