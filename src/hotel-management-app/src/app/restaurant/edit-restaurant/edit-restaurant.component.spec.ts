import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EditRestaurantComponent } from './edit-restaurant.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import { SharedModule } from '../../shared/shared.module';

// Mock RestaurantService
class MockRestaurantService {
  getRestaurantById(id: number): Restaurant {
    return {
      id,
      name: 'Test Restaurant',
      cuisine: 'Test Cuisine',
      description: 'Test Description',
      image: 'test-image.png',
      userId: 'user1',
      menu: []
    };
  }

  updateRestaurant(restaurant: Restaurant) {}
}

// Mock Router
class MockRouter {
  navigate(commands: any[]) {
    return true;
  }
}

// Mock ActivatedRoute
class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => {
        if (key === 'id') return '1';
        return null;
      }
    }
  };
}

describe('EditRestaurantComponent', () => {
  let component: EditRestaurantComponent;
  let fixture: ComponentFixture<EditRestaurantComponent>;
  let mockRestaurantService: MockRestaurantService;
  let mockRouter: MockRouter;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockRestaurantService = new MockRestaurantService();
    mockRouter = new MockRouter();
    mockActivatedRoute = new MockActivatedRoute();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SharedModule],
      declarations: [EditRestaurantComponent],
      providers: [
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the restaurant values', () => {
    const restaurant = mockRestaurantService.getRestaurantById(1);
    expect(component.restaurantForm.get('name')?.value).toBe(restaurant.name);
    expect(component.restaurantForm.get('cuisine')?.value).toBe(restaurant.cuisine);
    expect(component.restaurantForm.get('description')?.value).toBe(restaurant.description);
    expect(component.restaurantForm.get('image')?.value).toBe(restaurant.image);
  });

  it('should call updateRestaurant and navigate on saveRestaurant', () => {
    spyOn(mockRestaurantService, 'updateRestaurant');
    spyOn(mockRouter, 'navigate');

    component.restaurantForm.setValue({
      name: 'Updated Restaurant',
      cuisine: 'Updated Cuisine',
      description: 'Updated Description',
      image: 'updated-image.png'
    });

    component.saveRestaurant();

    expect(mockRestaurantService.updateRestaurant).toHaveBeenCalledWith({
      id: 1,
      name: 'Updated Restaurant',
      cuisine: 'Updated Cuisine',
      description: 'Updated Description',
      image: 'updated-image.png',
      userId: 'user1',
      menu:[]
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner-dashboard']);
  });

  it('should navigate to owner-dashboard on goBack', () => {
    spyOn(mockRouter, 'navigate');

    component.goBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner-dashboard']);
  });
});
