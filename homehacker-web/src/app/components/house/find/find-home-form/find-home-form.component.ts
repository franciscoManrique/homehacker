import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { House } from './../../../../models/house.model';
import { FormGroup } from '@angular/forms';
import { HomeService } from './../../../../shared/services/home.service';
import { EventEmitter } from '@angular/core';
import { ApiError } from './../../../../models/api-error.model';
import { HouseToFind } from './../../../../models/house-to-find.model';

@Component({
  selector: 'app-find-home-form',
  templateUrl: './find-home-form.component.html',
  styleUrls: ['./find-home-form.component.css']
})
export class FindHomeFormComponent implements OnInit {
  house: HouseToFind = new HouseToFind();
  @ViewChild('formHouseFind') formHouseFind: FormGroup;
  @Input() apiError: ApiError;
  @Output() houseFindSubmit: EventEmitter<HouseToFind> = new EventEmitter();
  
  constructor() { }
  
  ngOnInit() {
  }
  
  onSubmitFindHouse(){
    
    if (this.formHouseFind.valid) {
      console.log(this.house);
      this.houseFindSubmit.emit(this.house);
    }
  }
  
  reset(){
    this.formHouseFind.reset();
  }
  
}
