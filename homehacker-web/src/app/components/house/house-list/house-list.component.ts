import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../shared/services/home.service';
import { House } from '../../../models/house.model';
import { ApiError } from '../../../models/api-error.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  apiError: ApiError = new ApiError();
  houses: Array<House> = [];
  onHousesChangesSuscription: Subscription;
  constructor(private homeService: HomeService) { }
  
  ngOnInit() {
    this.homeService.list().subscribe((houses: Array<House>)=> {
      this.houses = houses;
    },
    (error: ApiError) =>{
      //ESTO NO ME HACE FALTA PORQUE LO BLOQUEO CON GUARDAS NO? ESTO ES SOLO PARA MOSTRAR ERRORES
      console.log('ERROR FRONT HOME LIST', error);
      this.apiError = error;
    }
  );
  
  this.onHousesChangesSuscription = this.homeService.onHomeChanges()
  .subscribe((houses: Array<House>) => {
    this.houses = houses;
  })
  
}
}
