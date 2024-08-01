import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  restaurants: Restaurant[] =[]

  constructor(
    private router: Router , 
    private customerService : CustomerService, 
    private restaurantService: RestaurantService,
    private cartService: CartService
  ){}
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: string = '';

  ngOnInit():void{
    const currentUserEmail = this.cartService.getUserEmail();
    this.restaurants = this.restaurantService.getRestaurants().filter(
      restaurant => restaurant.userId === currentUserEmail
    );
    console.log(this.restaurants);

  }

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  navToHome(){
    this.router.navigate(['/dashboard'])
  }

  openCart(){
    this.router.navigate(['/cart'])
  }

  openProfile(){
    this.router.navigate(['/profile'])
  }

  logout(){
    this.customerService.logout();
  }

  openTracking(){
    this.router.navigate(['/order-tracking'])
  }
}
