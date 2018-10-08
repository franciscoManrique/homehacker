import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../../shared/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { House } from '../../../models/house.model';
import { ApiError } from '../../../models/api-error.model';
import { FormGroup } from '@angular/forms';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../../shared/services/booking.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  house: House = new House();
  booking: Booking = new Booking();
  
  @ViewChild('formBooking') formBooking: FormGroup;
  apiError: ApiError;
  
  constructor(private homeService: HomeService, private route: ActivatedRoute, private bookingService: BookingService) { }
  
  
  ngOnInit() {    
    const houseId = this.route.snapshot.paramMap.get('id');
    
    this.homeService.get(houseId).subscribe((house: House) =>{
      this.house = house;      
    },
    (error: ApiError)  => {
      this.apiError = error;
    }
  );
}  

onSubmitBooking(){
  console.log(this.house.id);
  
  if(this.formBooking.valid){
    
    let booking = undefined;
    
    booking = {
      start: Object.values(this.booking.start).join('-'),
      end: Object.values(this.booking.end).join('-'),
      house: this.house.id,
      user: this.house.owner
    }
    this.bookingService.makeBooking(booking).subscribe(() => {
      
    })
  }
}


}


