import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChartDataset, ChartOptions } from 'chart.js';
import {Chart , registerables} from 'chart.js'
Chart.register(...registerables)


@Component({
  selector: 'app-sales-analytics',
  templateUrl: './sales-analytics.component.html',
  styleUrls: ['./sales-analytics.component.css']
})
export class SalesAnalyticsComponent implements OnInit {
  sales: any[] = [];
  restaurantId!: number;
  pieChart: any;

  constructor(
    private salesService: SalesService,
    private route: ActivatedRoute,
    private location: Location
  ) {} 

  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
    this.sales = this.salesService.getSalesByRestaurant(this.restaurantId);
    console.log(this.sales);
    this.createPieChart();
  }

  goBack(): void {
    this.location.back();
  }

  private createPieChart(): void {
    const itemSales = this.sales.reduce((acc, sale) => {
      if (!acc[sale.itemName]) {
        acc[sale.itemName] = 0;
      }
      acc[sale.itemName] += sale.quantity;
      return acc;
    }, {});
    
    console.log(itemSales);
    const labels = Object.keys(itemSales).map(itemId => itemId);
    const data = Object.values(itemSales);

    this.pieChart = new Chart('donutChart', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: labels.map(() => this.getRandomColor()),
          hoverOffset: 30
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
