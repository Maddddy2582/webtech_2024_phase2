import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../models/menu.model';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
})
export class AddMenuItemComponent implements OnInit {
  restaurantId!: number;
  menuItem: MenuItem = {
    restaurantId: 0,
    name: '',
    price: 0,
    description: '',
    imagePath: '',
    quantity: 0,
    id: 0
  };

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.restaurantId = +(this.route.snapshot.paramMap.get('restaurantId') as string);
  }

  saveMenuItem(): void {
    this.restaurantService.addMenuItem(this.restaurantId, this.menuItem)
    this.router.navigate(['/owner-dashboard'])
  }

  goBack(){
    this.router.navigate(['/owner-dashboard'])
  }
}
