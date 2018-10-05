import { Component, OnInit } from '@angular/core';
import { House } from '../../../models/house.model';
import { HomeService } from '../../../shared/services/home.service';
import { ApiError } from '../../../models/api-error.model';

@Component({
  selector: 'app-create-house-wrapper',
  templateUrl: './create-house-wrapper.component.html',
  styleUrls: ['./create-house-wrapper.component.css']
})
export class CreateHouseWrapperComponent implements OnInit {
  apiError: ApiError;
  constructor(private houseService:HomeService) { }
  
  ngOnInit() {
  }
  
  onSubmitCreateHouseForm(house: House):void{
    console.log(house);
    
    // this.houseService.create(house)
    // .subscribe(()=>{
      
    // },
    // (error: ApiError)=>{
    //   this.apiError = error;
    // });
  }
  
}
