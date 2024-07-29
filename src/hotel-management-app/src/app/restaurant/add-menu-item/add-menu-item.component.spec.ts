import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AddMenuItemComponent } from './add-menu-item.component';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuItem } from '../../models/menu.model';
import { SharedModule } from '../../shared/shared.module';

// Mock RestaurantService
class MockRestaurantService {
  addMenuItem(restaurantId: number, menuItem: MenuItem) {}
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
      get: (key: string) => '1'
    }
  };
}

describe('AddMenuItemComponent', () => {
  let component: AddMenuItemComponent;
  let fixture: ComponentFixture<AddMenuItemComponent>;
  let mockRestaurantService: MockRestaurantService;
  let mockRouter: MockRouter;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockRestaurantService = new MockRestaurantService();
    mockRouter = new MockRouter();
    mockActivatedRoute = new MockActivatedRoute();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SharedModule],
      declarations: [AddMenuItemComponent],
      providers: [
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls', () => {
    expect(component.menuForm.contains('name')).toBeTrue();
    expect(component.menuForm.contains('price')).toBeTrue();
    expect(component.menuForm.contains('description')).toBeTrue();
    expect(component.menuForm.contains('imagePath')).toBeTrue();
  });

  it('should make the name and price controls required', () => {
    const nameControl = component.menuForm.get('name');
    const priceControl = component.menuForm.get('price');

    nameControl?.setValue('');
    priceControl?.setValue(0);

    expect(nameControl?.valid).toBeFalse();
    expect(priceControl?.valid).toBeFalse();

    nameControl?.setValue('Test Item');
    priceControl?.setValue(10);

    expect(nameControl?.valid).toBeTrue();
    expect(priceControl?.valid).toBeTrue();
  });

  it('should call addMenuItem and navigate on saveMenuItem', () => {
    spyOn(mockRestaurantService, 'addMenuItem');
    spyOn(mockRouter, 'navigate');

    component.menuForm.setValue({
      name: 'Test Item',
      price: 10,
      description: 'Test Description',
      imagePath: 'test-image.png',

    });

    component.saveMenuItem();

    expect(mockRestaurantService.addMenuItem).toHaveBeenCalledWith(1, {
      name: 'Test Item',
      price: 10,
      description: 'Test Description',
      imagePath: 'test-image.png',
      restaurantId: 1,
      id: 0,
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
