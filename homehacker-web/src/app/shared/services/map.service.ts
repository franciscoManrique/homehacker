/// <reference types="googlemaps" />
import { Injectable, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Subject, Observable } from 'rxjs';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public static readonly LOCATION_KEY = 'location';
  
  place: google.maps.places.PlaceResult;
  location:  Array<Number> = [];
  address: string;
  coordsSubject = new Subject();
  addressSubject = new Subject();
  
  // locationCreateHouse: Array<number> = [];
  // addressCreateHouse: string;
  // coordsCreateHouseSubject =  new Subject();
  // addressCreateHouseSubject =  new Subject();
  
  
  // locationFindHouse: Array<number> = [];
  // addressFindHouse: string;
  // coordsFinHouseSubject =  new Subject();
  // addressFinHouseSubject =  new Subject();
  
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  autoCompleteCities(searchElement: ElementRef) {
    this.mapsAPILoader.load()
    .then(() => {
      console.log(searchElement);
      
      const autocomplete = new google.maps.places.Autocomplete(searchElement.nativeElement, { types: [] });
      
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.place = autocomplete.getPlace();
          
          this.location.splice(0, 2);
          this.location.push(this.place.geometry.location.lat())
          this.location.push(this.place.geometry.location.lng())
          this.address = this.place.formatted_address;

          // console.log(this.location);
          // console.log(this.address);
          
          this.notifyCoords();
          this.notifyAddress();

          // this.locationCreateHouse.splice(0, 2);
          // this.locationFindHouse.splice(0, 2);
          
          // this.locationCreateHouse.push(this.place.geometry.location.lat())
          // this.locationCreateHouse.push(this.place.geometry.location.lng())
          // this.addressCreateHouse = this.place.formatted_address;
          // this.notifyCoordinatesCreateHouseChanges();
          // this.notifyAdressCreateHouseChanges();
          
          // this.locationFindHouse.push(this.place.geometry.location.lat())
          // this.locationFindHouse.push(this.place.geometry.location.lng())
          // this.addressFindHouse = this.place.formatted_address;
          // this.notifyCoordinatesFindHouseChanges();
          // this.notifyAddressFindHouseChanges();
          
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          } 
        });
      });
    });
  }
  
  notifyCoords():void{
    this.coordsSubject.next(this.location);
  }
  notifyAddress():void{
    this.addressSubject.next(this.address);
  }

  onCoordsChanges(){
    return this.coordsSubject.asObservable();
  }
  onAddressChanges(){
    return this.addressSubject.asObservable();
  }

  // notifyCoordinatesCreateHouseChanges(): void{
  //   this.coordsCreateHouseSubject.next(this.locationCreateHouse);    
  // }
  
  // notifyAdressCreateHouseChanges(): void{
  //   this.addressCreateHouseSubject.next(this.addressCreateHouse);    
  // }
  
  // notifyCoordinatesFindHouseChanges(): void{
  //   this.coordsCreateHouseSubject.next(this.locationFindHouse);    
  // }
  
  // notifyAddressFindHouseChanges(): void{
  //   this.addressCreateHouseSubject.next(this.addressFindHouse);    
  // }
  
  
  // // PONER QUE TIPO DE OBSERVABLE RETORNA en los dos?????
  // onCoordsCreateHouseChanges(){
  //   return this.coordsCreateHouseSubject.asObservable();
  // }
  // onAdressCreateHouseChanges(){
  //   return this.addressCreateHouseSubject.asObservable();
  // }
  
  // // PONER QUE TIPO DE OBSERVABLE RETORNA en los dos?????
  // onCoordsFindHouseChanges(){
  //   return this.coordsCreateHouseSubject.asObservable();
  // }
  
  // onAdressFindHouseChanges(){
  //   return this.addressCreateHouseSubject.asObservable();
  // }
  
}


