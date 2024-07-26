import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DeliveryAgentNavBarComponent } from './delivery-agent-navbar.component';
import { DeliveryAgentService } from '../../services/delivery-agent.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';


describe('DeliveryAgentNavbarComponent', () => {
  let component: DeliveryAgentNavBarComponent;
  let fixture: ComponentFixture<DeliveryAgentNavBarComponent>;
  let deliveryAgentService : jasmine.SpyObj<DeliveryAgentService>;
  let router : Router;

  beforeEach(async () => {

    const deliveryAgentServiceSpy = jasmine.createSpyObj('DeliveryAgentService',['logout'])
    await TestBed.configureTestingModule({
      declarations: [DeliveryAgentNavBarComponent],
      imports: [ RouterTestingModule, MatToolbar, MatIcon],
      providers:[
        { provide: DeliveryAgentService , useValue: deliveryAgentServiceSpy }
      ]
    })
    .compileComponents();
    deliveryAgentService = TestBed.inject(DeliveryAgentService) as jasmine.SpyObj<DeliveryAgentService>;
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DeliveryAgentNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should naviagte to profile when profile icon is clicked', () => {
    spyOn(router, 'navigate');
    component.openProfile();
    expect(router.navigate).toHaveBeenCalledWith(['/delivery-agent/profile'])
  });

  it('should logout when logout function is called', ()=> {
    component.logout();
    expect(deliveryAgentService.logout).toHaveBeenCalled(); 
  })

  afterEach(() => {
    fixture.detectChanges();
    fixture.destroy();
  });

});
