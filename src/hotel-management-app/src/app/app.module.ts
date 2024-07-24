import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DeliveryAgentModule } from './delivery-agent/delivery-agent.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantService } from './services/restaurant.service';
import { BaseChartDirective } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomerModule,
    RestaurantModule,
    DeliveryAgentModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BaseChartDirective

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private http: HttpClient, private restaurantService: RestaurantService) {
    this.loadStaticData();
    restaurantService.initializeLocalStorage();
  }


  loadStaticData() {
    // this.http.get('assets/restaurants.json').subscribe(data => {
    //   localStorage.setItem('restaurants', JSON.stringify(data));
    // });

    // this.http.get('assets/menu.json').subscribe(data => {
    //   localStorage.setItem('menuData', JSON.stringify(data));
    // });
  }

}
