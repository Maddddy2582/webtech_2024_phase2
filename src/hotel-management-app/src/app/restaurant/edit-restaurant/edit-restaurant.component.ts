import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import { editResForm } from '../../models/edit-restaurant.model';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.css'
})
export class EditRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  restaurant: Restaurant | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
    private editResForm: FormBuilder
  ) {
    this.restaurantForm = this.editResForm.group({
      name: ['', Validators.required],
      cuisine: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    }) as FormGroup & {value: editResForm};
  }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.restaurant = this.restaurantService.getRestaurantById(id);
    if (this.restaurant) {
      this.restaurantForm.patchValue({
        name: this.restaurant.name,
        cuisine: this.restaurant.cuisine,
        description: this.restaurant.description,
        image: this.restaurant.image
      });
    }
  }

  saveRestaurant(): void {
    if (this.restaurantForm.valid && this.restaurant) {
      const updatedRestaurant: Restaurant = {
        ...this.restaurant,
        ...this.restaurantForm.value
      };
      this.restaurantService.updateRestaurant(updatedRestaurant);
      this.router.navigate(['/owner-dashboard']);
    }
  }

  goBack(){
    this.router.navigate(['/owner-dashboard'])
  }
}
