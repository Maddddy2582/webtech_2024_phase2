import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sales-analytics',
  templateUrl: './sales-analytics.component.html',
  styleUrls: ['./sales-analytics.component.css']
})
export class SalesAnalyticsComponent implements OnInit {
  sales: any[] = [];
  restaurantId!: number;

  constructor(
    private salesService: SalesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
    this.sales = this.salesService.getSalesByRestaurant(this.restaurantId);
    console.log(this.sales);
  }

  goBack(): void {
    this.location.back();
  }
}
