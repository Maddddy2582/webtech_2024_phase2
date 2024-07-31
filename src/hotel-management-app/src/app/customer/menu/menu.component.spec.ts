import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CartServiceMock } from '../../mocks/cart.service.mock';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantServiceMock } from '../../mocks/restaurant.service.mock'; 
import { CartService } from '../../services/cart.service';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu.model';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let cartService: CartServiceMock;
  let restaurantService: RestaurantServiceMock;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule , FormsModule, BrowserAnimationsModule],
      declarations: [ MenuComponent ],
      providers: [
        { provide: CartService, useClass: CartServiceMock },
        { provide: RestaurantService, useClass: RestaurantServiceMock },
        {
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
        {
          provide: Router,
          useValue: { navigate: () => Promise.resolve(true) }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as unknown as CartServiceMock;
    restaurantService = TestBed.inject(RestaurantService) as unknown as RestaurantServiceMock;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the restaurant based on route param', () => {
    const restaurant: Restaurant = { 
      id: 1, 
      name: 'Test Restaurant', 
      cuisine: 'Test cuisine',
      image: 'image.png',
      description: 'Test Descp',
      menu: [],
      userId: 'johnDoe@gmai.com' };
    spyOn(restaurantService, 'getRestaurantById').and.returnValue(restaurant);
    
    component.ngOnInit();

    expect(component.restaurant).toEqual(restaurant);
  });

  it('should add item to the cart', () => {
    const item: MenuItem = { 
      id: 1, 
      name: 'Pizza', 
      description: 'Delicious pizza', 
      price: 200,
      restaurantId: 1,
      quantity: 1,
      imagePath: 'imagepath.png' };
    component.addToCart(item);
    
    expect(cartService.getCart().length).toBe(1);
  });

  it('should filter menu items', () => {
    const items: MenuItem[] = [
      { id: 1, 
        name: 'Pizza', 
        description: 'Delicious pizza', 
        price: 200,
        restaurantId: 1,
        quantity: 1,
        imagePath: 'imagepath.png' },
      { id: 2, 
        name: 'Burger', 
        description: 'Tasty burger', 
        price: 150,
        restaurantId: 1,
        quantity: 1,
        imagePath: 'imagepath.png' }
    ];
    component.menu = items;
    component.searchTerm = 'Pizza';
    component.filterMenu(component.searchTerm);
    
    expect(component.filteredMenu.length).toBe(1);
    expect(component.filteredMenu[0].name).toBe('Pizza');
  });

  it('should navigate to dashboard', () => {
    spyOn(router, 'navigate');
    
    component.navTodashboard();
    
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
