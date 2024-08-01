import { Injectable } from '@angular/core';

interface SaleItem {
  restaurantId: number;
  itemName: string;
  itemId: number;
  quantity: number;
  date: Date;
  customerEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private salesKey = 'sales';
  private sales: { [key: string]: SaleItem[] } = {};

  constructor() {
    this.loadSales();
  }

  private loadSales(): void {
    const savedSales : string | null= localStorage.getItem(this.salesKey);
    this.sales = savedSales ? JSON.parse(savedSales) : {};
  }

  private saveSales(): void {
    localStorage.setItem(this.salesKey, JSON.stringify(this.sales));
  }

  logSale(userEmail: string, saleItems: SaleItem[]): void {
    if (!this.sales[userEmail]) {
      this.sales[userEmail] = [];
    }
    this.sales[userEmail] = this.sales[userEmail].concat(saleItems);
    this.saveSales();
  }

  getSalesByRestaurant(restaurantId: number): SaleItem[] {
    const allSales: SaleItem[] = Object.values(this.sales).flat();
    return allSales.filter(sale => sale.restaurantId === restaurantId);
  }
}
