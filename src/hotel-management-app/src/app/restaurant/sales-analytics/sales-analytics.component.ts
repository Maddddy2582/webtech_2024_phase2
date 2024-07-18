import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  barChart: any;
  showLog:boolean = true;

  constructor(
    private salesService: SalesService,
    private route: ActivatedRoute,
    private location: Location
  ) {} 

  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
    this.sales = this.salesService.getSalesByRestaurant(this.restaurantId);
    console.log(this.sales);
    this.createDoughnutChart();
    this.createBarChart();
  }

  goBack(): void {
    this.location.back();
  }

  private createDoughnutChart(): void {
    const itemSales = this.sales.reduce((acc, sale) => {
      if (!acc[sale.itemName]) {
        acc[sale.itemName] = 0;
      }
      acc[sale.itemName] += sale.quantity;
      return acc;
    }, {} as Record<number,number>);
    
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

  private createBarChart(): void {
    const dailySales = this.sales.reduce((acc, sale) => {
      const saleDate = new Date(sale.date);
      const day = saleDate.toLocaleDateString('en-US', { weekday: 'short' });
      if (!acc[day]) {
        acc[day] = 0;
      }
      acc[day] += 1;
      return acc;
    }, {});

    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = labels.map(day => dailySales[day] || 0);

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Total Orders',
          data,
          backgroundColor: this.getRandomColor()
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
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

  toggle(){
    this.showLog = !this.showLog
  }
}
