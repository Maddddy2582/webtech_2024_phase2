import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu.component.html',
  styleUrl: './edit-menu.component.css'
})
export class EditMenuComponent implements OnInit {
  menuForm!: FormGroup;
  menuItem: MenuItem | undefined;
  restaurantId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
    const itemId:number = +this.route.snapshot.paramMap.get('itemId')!;
    this.menuItem = this.restaurantService.getMenuItem(this.restaurantId, itemId);
    this.menuForm = this.formBuilder.group({
      name: [this.menuItem?.name, Validators.required],
      description: [this.menuItem?.description, Validators.required],
      price: [this.menuItem?.price, [Validators.required, Validators.min(0.01)]],
      imagePath: [this.menuItem?.imagePath, Validators.required]
    });
  }

  saveMenuItem(): void {
    if (this.menuForm.valid && this.menuItem && this.restaurantId) {
      const updatedMenuItem: MenuItem = { ...this.menuItem, ...this.menuForm.value };
      this.restaurantService.updateMenuItem(this.restaurantId, updatedMenuItem);
      this.router.navigate(['/owner-dashboard']);
    }
  }

  goBack(){
    this.router.navigate(['/owner-dashboard'])
  }
}
