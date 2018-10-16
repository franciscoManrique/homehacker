import { Component, OnInit, OnDestroy, ViewRef } from '@angular/core';
import { HomeService } from './../../../../shared/services/home.service';
import { House } from './../../../../models/house.model';
import { ApiError } from './../../../../models/api-error.model';
import { Subscription } from 'rxjs';
import { BookingService } from './../../../../shared/services/booking.service';
import { Booking } from './../../../../models/booking.model';
import { FindHomeFormComponent } from '../../find/find-home-form/find-home-form.component';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit, OnDestroy {
  apiError: ApiError;
  houses: Array<House> = [];
  minPrice: number;
  maxPrice: number;
  paintMapIfHouses: boolean = false;
  onHousesChangesSuscription: Subscription;
  
  constructor(private homeService: HomeService, private bookingService: BookingService) { }
  
  ngOnInit() {
    this.homeService.list().subscribe((houses: Array<House>)=> {
      this.houses = houses;                  
    },
    (error: ApiError) =>{
      this.apiError = error;
    }
  );
  
  this.onHousesChangesSuscription = this.homeService.onHomeChanges()
  .subscribe((houses: Array<House>) => { 
    this.houses = houses;    
  })
  
  // console.log(this.findHomeFormComponent);
  
}

ngOnDestroy(){
  console.log('destroyed house list suscription');
  this.onHousesChangesSuscription.unsubscribe();
}


}
