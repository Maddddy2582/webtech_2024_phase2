import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../models/menu.model';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainMenu } from '../../models/mainMenu.model';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrl: './add-menu-item.component.css'
})
export class AddMenuItemComponent implements OnInit {
  restaurantId!: number;
  menuForm!: FormGroup;
  menuItem: MainMenu = {
    restaurantId: 0,
    name: '',
    price: 0,
    description: '',
    imagePath: '',
    id: 0
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
    this.menuForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: [''],
      imagePath: ['', Validators.required]
    });
  }

  saveMenuItem(): void {
    if (this.menuForm.valid) {
    const menuItem: MenuItem = this.menuForm.value;
    menuItem.restaurantId = this.restaurantId;
    this.restaurantService.addMenuItem(this.restaurantId, menuItem)
    this.router.navigate(['/owner-dashboard'])
    }
  }

  goBack(){
    this.router.navigate(['/owner-dashboard'])
  }
}
