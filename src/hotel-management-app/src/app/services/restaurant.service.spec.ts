import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from '../models/restaurant.model';
import { MenuItem } from '../models/menu.model';
import { Location } from '@angular/common';
import { Customer } from '../models/customer.model';

// Mock Location
class MockLocation {
  go(path: string): void {}
}

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpMock: HttpTestingController;
  let mockLocation: jasmine.SpyObj<Location>;

  const mockRestaurants: Restaurant[] = [
    { id: 1, name: 'Restaurant 1', cuisine: 'Cuisine 1', description: 'Description 1', image: 'image1.jpg', menu: [], userId: 'johndoe@gmail.com' },
    { id: 2, name: 'Restaurant 2', cuisine: 'Cuisine 2', description: 'Description 2', image: 'image2.jpg', menu: [], userId: 'johndoe@gmail.com' }
  ];

  const mockCustomers: Customer[] = [
    { email: 'customer1@example.com', password: 'password1', id: 1, name: 'johndoe' }
  ];

  beforeEach(() => {
    mockLocation = jasmine.createSpyObj('Location', ['go']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestaurantService,
        { provide: Location, useValue: mockLocation }
      ]
    });

    service = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize localStorage with data from HTTP', () => {
    const req = httpMock.expectOne('/assets/restaurants.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockRestaurants);

    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    expect(storedRestaurants.length).toBe(2);
  });

  it('should load initial data if localStorage is empty', () => {
    localStorage.removeItem('restaurants');
    service.initializeLocalStorage();

    const req = httpMock.expectOne('/assets/restaurants.json');
    req.flush(mockRestaurants);

    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    expect(storedRestaurants.length).toBe(2);
  });

  it('should get restaurants', () => {
    localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
    const restaurants = service.getRestaurants();
    expect(restaurants.length).toBe(2);
    expect(restaurants[0].name).toBe('Restaurant 1');
  });

  it('should get a restaurant by ID', () => {
    localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
    const restaurant = service.getRestaurantById(1);
    // console.log(service.getRestaurantNameById(1));
    expect(restaurant).toBeDefined();
    expect(restaurant?.name).toBe('Restaurant 1');
  });

  it('should add a new restaurant', () => {
    localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
    const newRestaurant: Restaurant = {
      id: 0,
      name: 'New Restaurant',
      cuisine: 'New Cuisine',
      description: 'New Description',
      image: 'new_image.jpg',
      menu: [],
      userId: 'johndoe@gmail.com'
    };
    service.addRestaurant(newRestaurant);
    const updatedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    expect(updatedRestaurants.length).toBe(3);
    expect(updatedRestaurants[2].name).toBe('New Restaurant');
  });

  it('should add a menu item to a restaurant', () => {
    const restaurantId = 1;
    const menuItem: MenuItem = {
      id: 1,
      name: 'Menu Item 1',
      description: 'Description 1',
      price: 10.0,
      imagePath: 'item1.jpg',
      restaurantId: 1,
      quantity: 1
    };
    localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
    service.addMenuItem(restaurantId, menuItem);
    const updatedRestaurants = service.getRestaurants();
    expect(updatedRestaurants[0].menu.length).toBe(1);
    expect(updatedRestaurants[0].menu[0].name).toBe('Menu Item 1');
  });

  it('should get menu items for a restaurant', () => {
    const restaurantId = 1;
    const menuItem: MenuItem = {
      id: 1,
      name: 'Menu Item 1',
      description: 'Description 1',
      price: 10.0,
      imagePath: 'item1.jpg',
      restaurantId: 1,
      quantity: 1
    };
    mockRestaurants[0].menu.push(menuItem);
    localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
    const items = service.getMenuItems(restaurantId);
    expect(items.length).toBe(0);
    expect(items[0].name).toBe('Menu Item 1');
  });

  it('should update a restaurant', () => {
    const updatedRestaurant: Restaurant = {
      id: 1,
      name: 'Updated Restaurant',
      cuisine: 'Updated Cuisine',
      description: 'Updated Description',
      image: 'updated_image.jpg',
      menu: [],
      userId: 'johndoe@gmail.com'
    };
    localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
    service.updateRestaurant(updatedRestaurant);
    const updatedRestaurants = service.getRestaurants();
    expect(updatedRestaurants[0].name).toBe('Updated Restaurant');
  });

  it('should delete a menu item from a restaurant', () => {
    const restaurantId = 1;
    const menuItem: MenuItem = {
      id: 1,
      name: 'Menu Item 1',
      description: 'Description 1',
      price: 10.0,
      imagePath: 'item1.jpg',
      restaurantId: 1,
      quantity: 1
    };
    mockRestaurants[0].menu.push(menuItem);
    localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
    service.deleteMenu(restaurantId, 1);
    const updatedRestaurants = service.getRestaurants();
    expect(updatedRestaurants[0].menu.length).toBe(0);
  });

  it('should delete a restaurant', () => {
    localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
    const restaurantToDelete = mockRestaurants[0];
    service.deleteRestaurant(restaurantToDelete);
    const updatedRestaurants = service.getRestaurants();
    expect(updatedRestaurants.length).toBe(1);
    expect(updatedRestaurants[0].name).toBe('Restaurant 2');
  });

  it('should get customers', () => {
    localStorage.setItem('customers', JSON.stringify(mockCustomers));
    const customers = service.getCustomers();
    expect(customers.length).toBe(1);
    expect(customers[0].email).toBe('customer1@example.com');
  });

  it('should get a customer by email', () => {
    localStorage.setItem('customers', JSON.stringify(mockCustomers));
    const customer = service.getCustomerName('customer1@example.com');
    expect(customer).toBeDefined();
    expect(customer?.email).toBe('customer1@example.com');
  });
});
