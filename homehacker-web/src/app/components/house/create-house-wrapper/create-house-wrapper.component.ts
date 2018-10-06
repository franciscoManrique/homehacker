import { Component, OnInit } from '@angular/core';
import { House } from '../../../models/house.model';
import { HomeService } from '../../../shared/services/home.service';
import { ApiError } from '../../../models/api-error.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-house-wrapper',
  templateUrl: './create-house-wrapper.component.html',
  styleUrls: ['./create-house-wrapper.component.css']
})
export class CreateHouseWrapperComponent implements OnInit {
  apiError: ApiError;
  constructor(private houseService:HomeService, private router: Router) { }
  
  ngOnInit() {
  }
  
  onSubmitCreateHouseForm(house: House):void{
    this.houseService.create(house).subscribe((house: House) =>{
      this.router.navigate(['/houses']);
    }),
    (error: ApiError) => {
      this.apiError = error;
    }
  }
}
