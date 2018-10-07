// import { Directive, ElementRef, OnInit } from '@angular/core';
// import { google } from '@types/googlemaps';

// @Directive({
  
//   selector: '[appGoogleAutocomplete]'
// })
// export class GoogleAutocompleteDirective implements OnInit {
//   private element: HTMLInputElement; // 1. creo elemento html
  
//   constructor(private elementReferenced: ElementRef) { // 2. es la referencia
//     this.element = elementReferenced.nativeElement; // 3. mi elemento se convierte en la referencia
//   }
  
//   ngOnInit(){
//     const appGoogleAutocomplete = new google.maps.places.Autcomplete(this.element); // en el inicio de esta directiva, que sera cuando se cargue la app
//   }
// }