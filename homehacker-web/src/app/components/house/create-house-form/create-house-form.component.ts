import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
import { House } from '../../../models/house.model';
import { FormGroup } from '@angular/forms';
import { HomeService } from '../../../shared/services/home.service';
// import { MapsAPILoader } from '@agm/core';
// import {} from 'googlemaps';
// import { google } from '@agm/core/services/google-maps-types';


@Component({
  selector: 'app-create-house-form',
  templateUrl: './create-house-form.component.html',
  styleUrls: ['./create-house-form.component.css']
})
export class CreateHouseFormComponent{
  @ViewChild('formHouseCreate') houseCreateForm: FormGroup;
  // @ViewChild('search') searchElement: ElementRef;
  @Output() houseCreateSubmit: EventEmitter<House> = new EventEmitter();
  @Input() house: House = new House();
  
  previewImages: Array<String | ArrayBuffer> = [];
  constructor( private homeService: HomeService,  private changesDetector: ChangeDetectorRef,  private ngZone: NgZone) { }
  
  // ngOnInit() {
  //   this.mapsAPILoader.load()
  //   .then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {types: ['address']}); // busca lo que haya escrito en ese input
  //     autocomplete.addListener('place_changed', () =>{
  //       this.ngZone.run(() => {
  //         let place = google.maps.places.PlaceResult = autocomplete.getPlace();
  //         if(place.geometry === undefined || place.geometry === null ){
  //           return;
  //          }
  //       }) 
  //     });
  //   })
  //   .catch();
  // }
  
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
    reader.onload = () =>{
      this.previewImages.push(reader.result);
      this.changesDetector.markForCheck(); // ???? PARA QUE, SIN ESTO TAMBIEN SIRVE
    }
  }
}
