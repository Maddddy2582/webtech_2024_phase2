import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  restaurantId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
    if (this.restaurantId) {
      this.menuItems = this.restaurantService.getMenuItems(this.restaurantId);
    }
  }

  saveMenu(): void {
    if (this.restaurantId) {
      this.restaurantService.updateMenuItems(this.restaurantId, this.menuItems);
      this.router.navigate(['/owner-dashboard']);
    }
  }
}
