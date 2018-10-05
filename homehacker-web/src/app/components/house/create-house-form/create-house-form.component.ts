import { Component, OnInit, ViewChild } from '@angular/core';
import { House } from '../../../models/house.model';
import { FormGroup } from '@angular/forms';
import { HomeService } from '../../../shared/services/home.service';

@Component({
  selector: 'app-create-house-form',
  templateUrl: './create-house-form.component.html',
  styleUrls: ['./create-house-form.component.css']
})
export class CreateHouseFormComponent implements OnInit {
  @ViewChild('formHouseCreate') houseCreateForm: FormGroup;
  
  previewImage: string = 'https://www.google.es/imgres?imgurl=https%3A%2F%2Fimage.shutterstock.com%2Fimage-vector%2Fhome-icon-estate-premium-house-260nw-716338615.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fhouse%2Bicon&docid=yov62DAAVIFV0M&tbnid=Lx3YHL2vdFc_-M%3A&vet=10ahUKEwjpspKCvO3dAhWSuIsKHZT2BsgQMwg0KAIwAg..i&w=260&h=280&bih=718&biw=1309&q=house%20image%20icon&ved=0ahUKEwjpspKCvO3dAhWSuIsKHZT2BsgQMwg0KAIwAg&iact=mrc&uact=8';
  house: House = new House();
  
  constructor(private homeService: HomeService) { }
  
  ngOnInit() {
  }
  
  onSubmitCreateHouse(){
    console.log('dasdasd');
    
    this.homeService.create();
    if (this.houseCreateForm.valid) {
    }
  }
  
}
