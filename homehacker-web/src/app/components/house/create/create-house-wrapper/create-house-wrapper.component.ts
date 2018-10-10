import { Component, OnInit } from '@angular/core';
import { House } from './../../../../models/house.model';
import { HomeService } from './../../../../shared/services/home.service';
import { ApiError } from './../../../../models/api-error.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-house-wrapper',
  templateUrl: './create-house-wrapper.component.html',
  styleUrls: ['./create-house-wrapper.component.css']
})
export class CreateHouseWrapperComponent implements OnInit {
  apiError: ApiError;
  
  constructor(private homeService:HomeService, private router: Router) { }
  
  ngOnInit() {
  }
  
  onSubmitCreateHouseForm(house: House):void{
    
    if (house.start && house.end) {
      house.start = new Date(Object.values(house.start).join('-'));
      house.end = new Date(Object.values(house.end).join('-'));
    }
    
    this.homeService.create(house).subscribe((house: House) =>{
      this.router.navigate(['/home']);
    },
    (error: ApiError) => {
      console.log(error);
      this.apiError = error;
    })
  }
}

