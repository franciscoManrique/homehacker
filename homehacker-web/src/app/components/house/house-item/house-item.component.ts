import { Component, OnInit, Input } from '@angular/core';
import { House } from '../../../models/house.model';

@Component({
  selector: 'app-house-item',
  templateUrl: './house-item.component.html',
  styleUrls: ['./house-item.component.css']
})
export class HouseItemComponent implements OnInit {

  @Input() house = new House();
  
  constructor() { }

  ngOnInit() {
  }

}
