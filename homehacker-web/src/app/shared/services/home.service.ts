import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiError } from '../../models/api-error.model';
import { House } from '../../models/house.model';
import { BaseApiService } from './base.api.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseApiService {
  
  houses: Array<House> = [];
  
  //
  private static readonly HOUSE_API = `${environment.homehackerApi}`;
  private static readonly HOUSE_PART = 'houses';
  private static readonly USER_PART = 'users';
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  //si quiero acceder a la sesison cojo de ahi directamente el user
  constructor(private http: HttpClient, private session: SessionService) { 
    super();
  }
  
  list():Observable<Array<House> | ApiError>{
    return this.http.get<Array<House>>(`${HomeService.HOUSE_API}/${HomeService.HOUSE_PART}`, HomeService.defaultOptions)
    .pipe(
      map((houses: Array<House>)=>{
        this.houses = houses;
        return houses;
      }),
      catchError(this.handleError)
    )
  }
  
  create(house: House):Observable<House | ApiError>{  
    
    return this.http.post<House>(`${HomeService.HOUSE_API}/${HomeService.USER_PART}/${this.session.user.id}/houses`, house, HomeService.defaultOptions)
    .pipe(
      map((house: House) => {
        console.log(house);
        return house;
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