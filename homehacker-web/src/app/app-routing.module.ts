import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HouseListComponent } from './components/house/house-list/house-list.component';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { NotGoIfLoggedInGuardGuard } from './shared/guards/not-go-if-logged-in-guard.guard';
import { CreateHouseWrapperComponent } from './components/house/create-house-wrapper/create-house-wrapper.component';

const routes: Routes = [
  {path: '', redirectTo: '/houses', pathMatch: 'full'},
  {path: 'houses', canActivate: [IsAuthenticatedGuard], component: HouseListComponent},
  {path: 'createHouse', canActivate: [IsAuthenticatedGuard], component:CreateHouseWrapperComponent},
  {path: 'login', canActivate: [NotGoIfLoggedInGuardGuard], component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
