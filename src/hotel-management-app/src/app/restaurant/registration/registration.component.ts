import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu.model';
import { Location } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RestaurantRegistrationComponent implements OnInit {
  restaurantForm: FormGroup = {} as FormGroup;
  menuItems: MenuItem[] = [];

  constructor(
    private restaurantFormBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private cartService: CartService,
    @Inject(Location) private location: Location
  ) {}

  ngOnInit(): void {
    this.restaurantForm = this.restaurantFormBuilder.group({
      name: ['', Validators.required],
      cuisine: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg))')]],
    });
  }

  addMenuItem(): void {
    this.restaurantForm.patchValue({
      itemName: '',
      itemDescription: '',
      itemImagePath: '',
      itemPrice: ''
    });
  }

  registerRestaurant(): void {
    if (this.restaurantForm.valid) {
      const restaurant: Restaurant = {
        id: 0,
        userId: this.cartService.getUserEmail(),
        name: this.restaurantForm.get('name')?.value,
        cuisine: this.restaurantForm.get('cuisine')?.value,
        description: this.restaurantForm.get('description')?.value,
        image: this.restaurantForm.get('image')?.value,
        menu: this.menuItems
      };
      this.restaurantService.addRestaurant(restaurant);
      alert('Restaurant registered successfully!');
      this.router.navigate(['/owner-dashboard']);
    } else {
      alert('Please fill in all required fields.');
    }
  }

  goBack():void {
    this.location.back();
  }
}
