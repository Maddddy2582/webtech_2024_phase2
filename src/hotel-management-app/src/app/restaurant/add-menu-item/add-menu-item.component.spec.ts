import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AddMenuItemComponent } from './add-menu-item.component';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuItem } from '../../models/menu.model';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      imports: [ReactiveFormsModule, SharedModule, BrowserAnimationsModule],
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

  it('should navigate to owner-dashboard on goBack', () => {
    spyOn(mockRouter, 'navigate');

    component.goBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/owner-dashboard']);
  });
});
