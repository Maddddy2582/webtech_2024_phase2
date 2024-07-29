import { of } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { MenuItem } from '../models/menu.model';
import { Customer } from '../models/customer.model';

export class RestaurantServiceMock {
  private restaurants: Restaurant[] = [];
  private customers: Customer[] = [];

  constructor() {
    this.restaurants = [
      {
        id: 1,
        name: 'Mock Restaurant 1',
        cuisine: 'Test cuisine',
        image: 'image.png',
        description: 'Test Descp',
        menu: [],
        userId: 'johnDoe@gmai.com'
      },
      {
        id: 2,
        name: 'Mock Restaurant 2',
        cuisine: 'Test cuisine',
        image: 'image.png',
        description: 'Test Descp',
        menu: [],
        userId: 'johnDoe@gmai.com'
      }
    ];

    this.customers = [
      { email: 'customer1@example.com', 
        name: 'Customer 1',
        id: 1,
        password: 'password' },
      { email: 'customer2@example.com', 
        name: 'Customer 2',
        id: 1,
        password: 'password' }
    ];
  }

  loadInitialData() {
    return of(this.restaurants);
  }

  getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }

  getCustomers(): Customer[] {
    return [...this.customers];
  }

  getRestaurantById(id: number): Restaurant | undefined {
    return this.restaurants.find(r => r.id === id);
  }

  getRestaurantNameById(id: number): Restaurant | undefined {
    return this.getRestaurantById(id);
  }

  getCustomerName(userId: string) {
    return this.customers.find(customer => customer.email === userId);
  }

  addRestaurant(restaurant: Restaurant): void {
    restaurant.id = this.restaurants.length + 1;
    this.restaurants.push(restaurant);
  }

  addMenuItem(restaurantId: number, menuItem: MenuItem): void {
    const restaurant = this.getRestaurantById(restaurantId);
    if (restaurant) {
      menuItem.id = restaurant.menu.length ? Math.max(...restaurant.menu.map(m => m.id)) + 1 : 1;
      restaurant.menu.push(menuItem);
    }
  }

  getMenuItems(restaurantId: number): MenuItem[] {
    const restaurant = this.getRestaurantById(restaurantId);
    return restaurant?.menu || [];
  }

  getMenuItem(restaurantId: number, itemId: number): MenuItem | undefined {
    return this.getMenuItems(restaurantId).find(item => item.id === itemId);
  }

  updateRestaurant(updatedRestaurant: Restaurant): void {
    const index = this.restaurants.findIndex(r => r.id === updatedRestaurant.id);
    if (index !== -1) {
      this.restaurants[index] = updatedRestaurant;
    }
  }

  updateMenuItem(restaurantId: number, updatedMenuItem: MenuItem): void {
    const restaurant = this.getRestaurantById(restaurantId);
    if (restaurant) {
      const index = restaurant.menu.findIndex(item => item.id === updatedMenuItem.id);
      if (index !== -1) {
        restaurant.menu[index] = updatedMenuItem;
      }
    }
  }

  getRestaurantsByOwner(ownerEmail: string): Restaurant[] {
    return this.restaurants.filter(r => r.userId === ownerEmail);
  }

  deleteMenu(restaurantId: number, deleteitemId: number): void {
    const restaurant = this.getRestaurantById(restaurantId);
    if (restaurant) {
      const index = restaurant.menu.findIndex(item => item.id === deleteitemId);
      if (index !== -1) {
        restaurant.menu.splice(index, 1);
      }
    }
  }

  deleteRestaurant(restaurant: Restaurant): void {
    const index = this.restaurants.findIndex(r => r.id === restaurant.id);
    if (index !== -1) {
      this.restaurants.splice(index, 1);
    }
  }
}
