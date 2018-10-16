import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../../../../shared/services/home.service';
import { House } from '../../../../models/house.model';
import { ApiError } from '../../../../models/api-error.model';
import { Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { interval } from "rxjs/internal/observable/interval";

@Component({
  selector: 'app-my-houses-list',
  templateUrl: './my-houses-list.component.html',
  styleUrls: ['./my-houses-list.component.css']
})
export class MyHousesListComponent implements OnInit, OnDestroy {
  private static readonly POLLING_INTERVAL = 1000;
  
  apiError: ApiError;
  housesPerUser: Array<House> = [];
  onHousesPerUserChangesSuscription: Subscription;
  intervalPollingSubscription: Subscription;
  
  constructor(private homeService: HomeService) { }
  
  ngOnInit() {
    let userId = JSON.parse(localStorage.getItem('current-user')).id;    
    
    this.homeService.getHousesByUserId(userId).subscribe((housesPerUser: Array<House>) => {
      this.housesPerUser = housesPerUser;      
    },
    (error: ApiError) => {
      this.apiError = error;
    })
    
    this.onHousesPerUserChangesSuscription = this.homeService.onHomePerUserChanges()
    .subscribe((housesPerUser: Array<House>) => {
      this.housesPerUser = housesPerUser;      
      console.log(this.housesPerUser);
    })  
  }
  
  ngOnDestroy() {
    // this.intervalPollingSubscription.unsubscribe();
    this.onHousesPerUserChangesSuscription.unsubscribe();
  }
  
}
