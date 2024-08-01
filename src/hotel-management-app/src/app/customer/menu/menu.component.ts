import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu.model';
import { CartService } from '../../services/cart.service';
import { RestaurantService } from '../../services/restaurant.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurant!: Restaurant | undefined;
  menu: MenuItem[] = [];
  cart: MenuItem[] = [];
  filteredMenu: MenuItem[] = [];
  searchTerm: string = '';


  constructor(
    private route: ActivatedRoute, 
    private cartService: CartService, 
    private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') as string);
    this.restaurant = this.restaurantService.getRestaurantById(id);
  }

  addToCart(item: MenuItem): void {
    const id = +(this.route.snapshot.paramMap.get('id') as string);
    this.cartService.checkRestaurant(item,id);
  }

  filterMenu(searchTerm:String): void {
    this.filteredMenu = this.menu.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
