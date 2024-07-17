import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  menuItem: MenuItem | undefined;
  restaurantId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
    const itemId = +this.route.snapshot.paramMap.get('itemId')!;
    this.menuItem = this.restaurantService.getMenuItem(this.restaurantId, itemId);
  }

  saveMenuItem(): void {
    if (this.menuItem && this.restaurantId) {
      console.log(this.menuItem);
      console.log(this.restaurantId);
      this.restaurantService.updateMenuItem(this.restaurantId, this.menuItem);
      this.router.navigate(['/owner-dashboard']);
    }
  }

  goBack(){
    this.router.navigate(['/owner-dashboard'])
  }
}
