import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import { NavBarComponent } from '../navbar/navbar.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockRestaurantService: jasmine.SpyObj<RestaurantService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock services
    mockRestaurantService = jasmine.createSpyObj('RestaurantService', ['getRestaurants']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Define mock data
    const mockRestaurants: Restaurant[] = [
      { id: 1, name: 'Pizza Place', cuisine: 'Italian', description: 'Best pizza in town', image: '', menu: [], userId: "johndoe@gmail.com" },
      { id: 2, name: 'Sushi World', cuisine: 'Japanese', description: 'Fresh sushi daily', image: '' , menu: [], userId: "johndoe@gmail.com" }
    ];

    // Setup spies
    mockRestaurantService.getRestaurants.and.returnValue(mockRestaurants);

    await TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, BrowserAnimationsModule],
      declarations: [DashboardComponent, NavBarComponent],
      providers: [
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurants on initialization', () => {
    component.ngOnInit();
    expect(component.restaurants.length).toBe(2);
    expect(component.filteredRestaurants.length).toBe(2);
  });

  it('should filter restaurants based on search term', () => {
    component.filterRestaurants('Pizza');
    expect(component.filteredRestaurants.length).toBe(1);
    expect(component.filteredRestaurants[0].name).toBe('Pizza Place');
  });

  it('should call router navigate on viewMenu', () => {
    component.viewMenu(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/menu', 1]);
  });
});
