import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiError } from '../../models/api-error.model';
import { House } from '../../models/house.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  houses: Array<House> = [];
  
  private static readonly SESSION_API = `${environment.homehackerApi}/houses`;
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  constructor(private http: HttpClient) { }
  
  list():Observable<Array<House> | ApiError>{
    return this.http.get(HomeService.SESSION_API, HomeService.defaultOptions)
    .pipe(
      map((houses: Array<House>)=>{
        this.houses = houses;
        return houses;
      }),
      catchError(this.handleError)
    )
  }
  
  private handleError(error: HttpErrorResponse): Observable<ApiError> {
    console.error('An error occurred:', error);
    const apiError = new ApiError();
    //client side error=> 
    if (error.error instanceof ErrorEvent) {
      console.error('Client error:', error.error.message);
      apiError.message = 'Something bad happened; please try again later.';
    } else {
      //backend error=>
      apiError.message = error.error.message;
      apiError.errors = error.error.errors;
    }
    //EMITS AN ERROR NOTIFICATION=> NO ES LO MISMO QUE EL throw de la api     
    //ENVIO ERROR AL CATCH DE ARRIBA DE VUELTA
    return throwError(apiError);
  }
}