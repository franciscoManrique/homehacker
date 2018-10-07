import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { House } from '../../../models/house.model';
import { HomeService } from '../../../shared/services/home.service';
import { Router } from '@angular/router';
import { FindHomeFormComponent } from '../find-home-form/find-home-form.component';
import { ApiError } from '../../../models/api-error.model';
import { HouseToFind } from '../../../models/house-to-find.model';

@Component({
  selector: 'app-find-home-wrapper',
  templateUrl: './find-home-wrapper.component.html',
  styleUrls: ['./find-home-wrapper.component.css']
})
export class FindHomeWrapperComponent implements OnInit {
  apiError: ApiError;
  @ViewChild(FindHomeFormComponent) findHomeFormComponent: FindHomeFormComponent;
  
  constructor(private homeService: HomeService, private router: Router) { }
  
  ngOnInit() {
  }
  
  
  onSubmitFindHouse(houseToFind: HouseToFind){
    
    this.homeService.findHousesByFilter(houseToFind).subscribe((houses: Array<House>) => {
      console.log(houses);
      
    });
    
  }
  
  
}

//     start: string;
//     end: string;
//     people: number;
//     kids: number;
//     //TO DO
//     // location:
//     latitude: string;
//     longitude: string;
// }


//   const start =  Object.values(house.start).join('-');
//   const end = Object.values(house.end).join('-');

//   const people = Number(house.people);

//   const housePrototype = {
//     start: start,
//     end: end,
//     longitude: house.longitude,
//     latitude: house.latitude,
//     people: people
//   }

