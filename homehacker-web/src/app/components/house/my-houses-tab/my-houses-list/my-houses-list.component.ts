import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../shared/services/home.service';
import { House } from '../../../../models/house.model';
import { ApiError } from '../../../../models/api-error.model';

@Component({
  selector: 'app-my-houses-list',
  templateUrl: './my-houses-list.component.html',
  styleUrls: ['./my-houses-list.component.css']
})
export class MyHousesListComponent implements OnInit {
  apiError: ApiError;
  housesPerUser: Array<House> = [];
  
  constructor(private homeService: HomeService) { }
  
  ngOnInit() {
    let userId = JSON.parse(localStorage.getItem('current-user')).id;        
    this.homeService.getHousesByUserId(userId).subscribe((housesPerUser: Array<House>) => {
      this.housesPerUser = housesPerUser;      
    },
    (error: ApiError)=> {
      this.apiError = error;
    })
  }
}
