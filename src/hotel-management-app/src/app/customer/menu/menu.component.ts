import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu.model';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurant!: Restaurant;
  menu: MenuItem[] = [];
  cart: MenuItem[] = [];
  filteredMenu: MenuItem[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    const restaurantId = +this.route.snapshot.paramMap.get('id')!;
    const restaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') || '[]');
    this.restaurant = restaurants.find(r => r.id === restaurantId)!;

    this.http.get<MenuItem[]>(`assets/menu.json`).subscribe((data: any) => {
      const restaurantMenu = data.find((menu: any) => menu.restaurantId === restaurantId);
      this.menu = restaurantMenu ? restaurantMenu.items : [];
      this.filteredMenu = [...this.menu];
    });
  }

  addToCart(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  filterMenu(searchTerm: string): void {
    this.filteredMenu = this.menu.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
