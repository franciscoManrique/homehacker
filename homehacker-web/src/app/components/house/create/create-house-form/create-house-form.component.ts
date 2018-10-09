import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
import { House } from './../../../../models/house.model';
import { FormGroup } from '@angular/forms';
import { HomeService } from './../../../../shared/services/home.service';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
/// <reference types="@types/googlemaps" />


@Component({
  selector: 'app-create-house-form',
  templateUrl: './create-house-form.component.html',
  styleUrls: ['./create-house-form.component.css']
})
export class CreateHouseFormComponent implements OnInit{
  @ViewChild('formHouseCreate') houseCreateForm: FormGroup;
  @ViewChild('search') searchElement: ElementRef;
  @Output() houseCreateSubmit: EventEmitter<House> = new EventEmitter();
  @Input() house: House = new House();
  previewImages: Array<String> = [];
  
  place: google.maps.places.PlaceResult;
  latitude: Array<number> = [];
  longitude: Array<number> = [];
  
  constructor(private homeService: HomeService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private changesDetector: ChangeDetectorRef) { }
  
  ngOnInit(){
    this.autoCompleteCities(this.searchElement);
    console.log(this.latitude);
    console.log(this.longitude);
    
  }
  
  autoCompleteCities(searchElement: ElementRef) {
    this.mapsAPILoader.load()
    .then(() => {
      const autocomplete = new google.maps.places.Autocomplete(searchElement.nativeElement, { types: [] });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          
          this.place = autocomplete.getPlace();
          console.log(this.place.geometry.location.lat());
          console.log(this.place.geometry.location.lng());
          
          this.latitude.push(this.place.geometry.location.lat());
          this.longitude.push(this.place.geometry.location.lng());
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }
        });
      });
    });
  }
  
  
  
  
  onClickAddAmenity(amenity: HTMLInputElement){
    let amenityValue = amenity.value;
    if (!this.house.amenities.includes(amenity.value) && amenityValue) {
      
      this.house.amenities.push(amenityValue);
    }
    amenity.value = '';  
    
  }
  
  
  onClickRemoveAmenity(amenity: string){
    this.house.amenities = this.house.amenities.filter(a => {
      return a !== amenity;
    });
    
  }
  
  onSubmitCreateHouse(){                 
    if (this.houseCreateForm.valid) {
      this.houseCreateSubmit.emit(this.house);
    }
    console.log(this.house.photos)
  }
  
  onChangeImageFile(images: HTMLInputElement){
    if (images.files) {
      
      this.previewImages = [];
      for (let i = 0; i < images.files.length; i++) {        
        this.house.photos.push(images.files[i]);
        this.renderPreviewImg(images.files[i]);
      }      
    }
  }
  
  renderPreviewImg(photoFile: File){
    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onload = () => {
      this.previewImages.push(reader.result);
      this.changesDetector.markForCheck(); // ???? PARA QUE, SIN ESTO TAMBIEN SIRVE
    }
  }
}
