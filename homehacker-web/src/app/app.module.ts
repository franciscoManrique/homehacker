import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/misc/header/header.component';
import { FooterComponent } from './components/misc/footer/footer.component';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { HouseListComponent } from './components/house/listing/house-list/house-list.component';
import { HouseItemComponent } from './components/house/listing/house-item/house-item.component';

import { CreateHouseFormComponent } from './components/house/create/create-house-form/create-house-form.component';
import { CreateHouseWrapperComponent } from './components/house/create/create-house-wrapper/create-house-wrapper.component';
import { HouseDetailComponent } from './components/house/detail/house-detail.component';
import { FindHomeFormComponent } from './components/house/find/find-home-form/find-home-form.component';
import { FindHomeWrapperComponent } from './components/house/find/find-home-wrapper/find-home-wrapper.component';
import { MyHousesItemComponent } from './components/house/my-houses-tab/my-houses-item/my-houses-item.component';
import { MyHousesListComponent } from './components/house/my-houses-tab/my-houses-list/my-houses-list.component';
import { MyBookingsListComponent } from './components/booking/my-bookings-tab/my-bookings-list/my-bookings-list.component';
import { MyBookingsItemComponent } from './components/booking/my-bookings-tab/my-bookings-item/my-bookings-item.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // bootstrap nav responsive
import {AgmCoreModule} from '@agm/core'; // google maps
import {CarouselModule} from 'ngx-bootstrap/carousel'; // carousel for detail images


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HouseListComponent,
    HouseItemComponent,
    CreateHouseFormComponent,
    CreateHouseWrapperComponent,
    HouseDetailComponent,
    FindHomeFormComponent,
    FindHomeWrapperComponent,
    MyHousesItemComponent,
    MyHousesListComponent,
    MyBookingsListComponent,
    MyBookingsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDeZy_fS4ry7LS6HwGT31iT0WaaJkH-Fgk',
      libraries: ['places']
    }),
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
