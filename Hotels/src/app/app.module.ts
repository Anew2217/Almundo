import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AppRoutingModule } from './app-routing/app-routing.module'

import { AppComponent } from './app.component';
import { SearchComponent } from './Components/search/search.component';

import { HotelService } from './Sevices/hotel.service'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HotelService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
