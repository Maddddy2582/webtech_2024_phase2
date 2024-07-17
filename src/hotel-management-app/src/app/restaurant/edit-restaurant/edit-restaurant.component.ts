import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  restaurant: Restaurant | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.restaurant = this.restaurantService.getRestaurantById(id);
  }

  saveRestaurant(): void {
    if (this.restaurant) {
      this.restaurantService.updateRestaurant(this.restaurant);
      this.router.navigate(['/owner-dashboard']);
    }
  }

  goBack(){
    this.router.navigate(['/owner-dashboard'])
  }

  
}
