import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    ServerModule,
  ],
  bootstrap: [AppComponent],

  providers: [provideHttpClient()]
})
export class AppServerModule {}
