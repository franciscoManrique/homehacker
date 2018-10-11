import { Component, OnInit, Input } from '@angular/core';
import { House } from '../../../../models/house.model';

@Component({
  selector: 'app-my-houses-item',
  templateUrl: './my-houses-item.component.html',
  styleUrls: ['./my-houses-item.component.css']
})
export class MyHousesItemComponent implements OnInit {

  @Input() housePerUser: House;

  constructor() { }

  ngOnInit() {
  }

}
