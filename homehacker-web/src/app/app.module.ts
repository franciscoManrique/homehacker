import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { MainNavComponent } from './components/misc/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { CreateHouseFormComponent } from './components/house/create-house-form/create-house-form.component';
import { CreateHouseWrapperComponent } from './components/house/create-house-wrapper/create-house-wrapper.component';
import { HouseDetailComponent } from './components/house/house-detail/house-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HouseListComponent,
    HouseItemComponent,
    MainNavComponent,
    CreateHouseFormComponent,
    CreateHouseWrapperComponent,
    HouseDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
