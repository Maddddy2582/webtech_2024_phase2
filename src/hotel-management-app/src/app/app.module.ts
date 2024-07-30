import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

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
    BaseChartDirective,
    SharedModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private http: HttpClient, private restaurantService: RestaurantService) {
    restaurantService.initializeLocalStorage();
  }
}
