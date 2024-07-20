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
    private http: HttpClient, 
    private cartService: CartService, 
    private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.restaurant = this.restaurantService.getRestaurantById(id);
    // const restaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') || '[]');
    // this.restaurant = restaurants.find(r => r.id === restaurantId)!;

    // this.http.get<MenuItem[]>(`assets/menu.json`).subscribe((data: any) => {
    //   const restaurantMenu = data.find((menu: any) => menu.restaurantId === restaurantId);
    //   this.menu = restaurantMenu ? restaurantMenu.items : [];
    //   this.filteredMenu = [...this.menu];
    // });
    // this.filteredMenu = [...menuItems]
  }

  addToCart(item: MenuItem): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    console.log(id);
    console.log(item);
    this.cartService.checkRestaurant(item,id);
  }

  filterMenu(searchTerm:String): void {
    this.filteredMenu = this.menu.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
