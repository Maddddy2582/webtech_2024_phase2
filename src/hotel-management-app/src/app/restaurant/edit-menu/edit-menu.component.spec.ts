import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EditMenuComponent } from './edit-menu.component';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuItem } from '../../models/menu.model';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mock RestaurantService
class MockRestaurantService {
  getMenuItem(restaurantId: number, itemId: number): MenuItem {
    return {
      restaurantId,
      id: itemId,
      name: 'Test Item',
      price: 10,
      description: 'Test Description',
      imagePath: 'test-image.png',
      quantity: 0
    };
  }

  updateMenuItem(restaurantId: number, menuItem: MenuItem) {}
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
        if (key === 'restaurantId') return '1';
        if (key === 'itemId') return '2';
        return null;
      }
    }
  };
}

describe('EditMenuComponent', () => {
  let component: EditMenuComponent;
  let fixture: ComponentFixture<EditMenuComponent>;
  let mockRestaurantService: MockRestaurantService;
  let mockRouter: MockRouter;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockRestaurantService = new MockRestaurantService();
    mockRouter = new MockRouter();
    mockActivatedRoute = new MockActivatedRoute();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SharedModule, BrowserAnimationsModule],
      declarations: [EditMenuComponent],
      providers: [
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the menu item values', () => {
    const menuItem = mockRestaurantService.getMenuItem(1, 2);
    expect(component.menuForm.get('name')?.value).toBe(menuItem.name);
    expect(component.menuForm.get('description')?.value).toBe(menuItem.description);
    expect(component.menuForm.get('price')?.value).toBe(menuItem.price);
    expect(component.menuForm.get('imagePath')?.value).toBe(menuItem.imagePath);
  });

  it('should call updateMenuItem and navigate on saveMenuItem', () => {
    spyOn(mockRestaurantService, 'updateMenuItem');
    spyOn(mockRouter, 'navigate');

    component.menuForm.setValue({
      name: 'Updated Item',
      price: 15,
      description: 'Updated Description',
      imagePath: 'updated-image.png'
    });

    component.saveMenuItem();

    expect(mockRestaurantService.updateMenuItem).toHaveBeenCalledWith(1, {
      restaurantId: 1,
      id: 2,
      name: 'Updated Item',
      price: 15,
      description: 'Updated Description',
      imagePath: 'updated-image.png',
      quantity: 0
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner-dashboard']);
  });

  it('should navigate to owner-dashboard on goBack', () => {
    spyOn(mockRouter, 'navigate');

    component.goBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner-dashboard']);
  });
});
