import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/misc/header/header.component';
import { FooterComponent } from './components/misc/footer/footer.component';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { HouseListComponent } from './components/house/house-list/house-list.component';
import { HouseItemComponent } from './components/house/house-item/house-item.component';

import { CreateHouseFormComponent } from './components/house/create-house-form/create-house-form.component';
import { CreateHouseWrapperComponent } from './components/house/create-house-wrapper/create-house-wrapper.component';
import { HouseDetailComponent } from './components/house/house-detail/house-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { GoogleAutocompleteDirective } from './shared/directives/google-autocomplete.directive';
import {AgmCoreModule} from '@agm/core';
import { FindHomeFormComponent } from './components/home/find-home-form/find-home-form.component';
import { FindHomeWrapperComponent } from './components/home/find-home-wrapper/find-home-wrapper.component';

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
    // GoogleAutocompleteDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDeZy_fS4ry7LS6HwGT31iT0WaaJkH-Fgk',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
