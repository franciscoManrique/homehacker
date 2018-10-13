import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiError } from '../../models/api-error.model';
import { House } from '../../models/house.model';
import { BaseApiService } from './base.api.service';
import { SessionService } from './session.service';
import { HouseToFind } from '../../models/house-to-find.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseApiService {
  
  houses: Array<House> = [];
  housesSubject: Subject<Array<House>> = new Subject();
  
  housesPerUser: Array<House> = [];
  housesPerUserSubject: Subject<Array<House>> = new Subject();
  
  private static readonly HOUSE_API = `${environment.homehackerApi}`;
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  //si quiero acceder a la sesison cojo de ahi directamente el user
  constructor(private http: HttpClient, private session: SessionService) {
    super();
  }
  
  //CREATE HOUSE
  create(house: House):Observable<House | ApiError> {    
    return this.http.post<House>(`${HomeService.HOUSE_API}/users/${this.session.user.id}/houses`, house.asFormData(), { withCredentials: true })
    .pipe(
      map((house: House) => {
        this.houses.push(house);
        this.notifyHousesChanges();  //notifico para la lista de casas (auque no hace falta porque hay un navigate despues)   
        
        // this.housesPerUser.push(house);        
        // this.notifyHousesPerUserChanges();  //notifico para tener en tiempo real el list de mis casas tab ????      
        return house;
      }),
      catchError(this.handleError)
    )
  }
  
  
  //LIST ALL ONLY PROVIDE 50 RESULTS AT FIRST THEN WEHEN REFINE SEARCH GIVE DIFERENT VALUES
  list():Observable<Array<House> | ApiError>{ 
    return this.http.get<Array<House>>(`${HomeService.HOUSE_API}/houses`, HomeService.defaultOptions)
    .pipe(
      map((houses: Array<House>)=>{  
        this.houses = houses;
        this.notifyHousesChanges();
        return houses;
      }),
      catchError(this.handleError)
    )
  }
  
  //GET HOUSE BY ID
  get(id: string):Observable<House | ApiError>{
    return this.http.get<House>(`${HomeService.HOUSE_API}/houses/${id}`, HomeService.defaultOptions)
    .pipe(
      map((house: House)=>{
        return house;
      }),
      catchError(this.handleError)
    )
  }
  
  //GET HOUSES BY USERID
  getHousesByUserId(userId: string):Observable<Array<House> | ApiError>{            
    return this.http.get<Array<House>>(`${HomeService.HOUSE_API}/users/${userId}/houses`, HomeService.defaultOptions)
    .pipe(
      map((housesPerUser: Array<House>) => {        
        this.housesPerUser = housesPerUser;
        this.notifyHousesPerUserChanges();        
        return housesPerUser;
      }),
      catchError(this.handleError)
    )
  }
  
  //LIST BY WHAT THE USER CHOSE
  findHousesByFilter(houseToFind: HouseToFind):Observable<Array<House> | ApiError>{ 
    let [longitude, latitude] = houseToFind.location;
    
    const modified = {
      start: Object.values(houseToFind.start).join('-'),
      end: Object.values(houseToFind.end).join('-'),
      people: houseToFind.people,
      longitude: longitude,
      latitude: latitude,
    }
        
    const query = `filter?start=${modified.start}&end=${modified.end}&people=${modified.people}&longitude=${modified.longitude}&latitude=${modified.latitude}`;
    
    return this.http.get<Array<House>>(`${HomeService.HOUSE_API}/houses/${query}`, HomeService.defaultOptions)
    .pipe(
      map((houses: Array<House>)=>{
        this.houses = houses;
        this.notifyHousesChanges();
        return houses;
      }),
      catchError(this.handleError)
    )
  }
  
  deleteHouseOfUser(id: string):Observable<void | ApiError>{
    console.log(`${HomeService.HOUSE_API}/houses/${id}`);
    
    return this.http.delete<void>(`${HomeService.HOUSE_API}/houses/${id}`, HomeService.defaultOptions)
    .pipe(
      map(() => {
        this.housesPerUser = this.housesPerUser.filter(houses => houses.id !== id);
        this.notifyHousesPerUserChanges();
        return;
      }),
      catchError(this.handleError)
    )
  }
  
  notifyHousesChanges():void{
    this.housesSubject.next(this.houses);    
  }
  
  notifyHousesPerUserChanges():void{
    this.housesPerUserSubject.next(this.housesPerUser);    
  }
  
  onHomeChanges(): Observable<Array<House>>{
    return this.housesSubject.asObservable();
  }
  
  onHomePerUserChanges(): Observable<Array<House>>{
    return this.housesPerUserSubject.asObservable();
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