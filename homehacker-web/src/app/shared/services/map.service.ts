/// <reference types="googlemaps" />
import { Injectable, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Subject } from 'rxjs';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public static readonly LOCATION_KEY = 'location';
  
  place: google.maps.places.PlaceResult;
  location: Array<number> = [];
  address: string;
  
  coordsSubject =  new Subject();
  addressSubject =  new Subject();
  
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  autoCompleteCities(searchElement: ElementRef) {
    this.mapsAPILoader.load()
    .then(() => {
      const autocomplete = new google.maps.places.Autocomplete(searchElement.nativeElement, { types: [] });
      
      return autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.place = autocomplete.getPlace();
          
          this.location.splice(0, 2);
          this.location.push(this.place.geometry.location.lat())
          this.location.push(this.place.geometry.location.lng())
          this.notifyCoordinatesChanges();

          this.address = this.place.formatted_address;
          this.notifyAdressChanges();

          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          } 
        });
      });
    });
  }
  
  notifyCoordinatesChanges(){
    this.coordsSubject.next(this.location);    
  }
  
  notifyAdressChanges(){
    this.addressSubject.next(this.address);    
  }
  
  onCoordsChanges(){
    return this.coordsSubject.asObservable();
  }
  onAdressChanges(){
    return this.addressSubject.asObservable();
  }
  
}


