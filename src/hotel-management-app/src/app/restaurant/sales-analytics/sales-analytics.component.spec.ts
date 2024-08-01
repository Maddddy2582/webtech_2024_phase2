import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesAnalyticsComponent } from './sales-analytics.component';
import { SalesService } from '../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { SharedModule } from '../../shared/shared.module';

// Register Chart.js components
Chart.register(...registerables);

class MockSalesService {
  getSalesByRestaurant(restaurantId: number) {
    return [
      { itemName: 'Burger', quantity: 10, date: '2024-07-01' },
      { itemName: 'Pizza', quantity: 5, date: '2024-07-01' },
      { itemName: 'Burger', quantity: 8, date: '2024-07-02' },
      // Add more mock data if needed
    ];
  }
}

class MockActivatedRoute {
  snapshot = { paramMap: new Map<string, string>([['restaurantId', '1']]) };
}

class MockLocation {
  back() {}
}

describe('SalesAnalyticsComponent', () => {
  let component: SalesAnalyticsComponent;
  let fixture: ComponentFixture<SalesAnalyticsComponent>;
  let mockSalesService: MockSalesService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockSalesService = new MockSalesService();
    mockActivatedRoute = new MockActivatedRoute();
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SalesAnalyticsComponent],
      providers: [
        { provide: SalesService, useValue: mockSalesService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Clean up any existing charts before each test
    const chartIds = ['donut-chart', 'bar-chart'];
    chartIds.forEach(id => {
      const canvas = document.getElementById(id) as HTMLCanvasElement;
      if (canvas && Chart.getChart(canvas)) {
        Chart.getChart(canvas)?.destroy();
      }
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sales data and create charts', () => {
    spyOn(component, 'createDoughnutChart').and.callThrough();
    spyOn(component, 'createBarChart').and.callThrough();

    component.ngOnInit();

    expect(component.sales.length).toBeGreaterThan(0);
    expect(component.createDoughnutChart).toHaveBeenCalled();
    expect(component.createBarChart).toHaveBeenCalled();
  });

  it('should create a doughnut chart', () => {
    component.ngOnInit();
    const chartElement = document.getElementById('donut-chart') as HTMLCanvasElement;

    expect(component.pieChart).toBeDefined();
    expect(chartElement).not.toBeNull();
  });

  it('should create a bar chart', () => {
    component.ngOnInit();
    const chartElement = document.getElementById('bar-chart') as HTMLCanvasElement;

    expect(component.barChart).toBeDefined();
    expect(chartElement).not.toBeNull();
  });

  it('should go back to the previous location', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should toggle the showLog property', () => {
    expect(component.showLog).toBe(true);
    component.toggle();
    expect(component.showLog).toBe(false);
    component.toggle();
    expect(component.showLog).toBe(true);
  });

  it('should generate a random color', () => {
    const color = component.getRandomColor();
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });
});
