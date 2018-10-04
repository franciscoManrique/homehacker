import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { ApiError } from '../../models/api-error.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  private static readonly SESSION_API = `${environment.homehackerApi}/sessions`;
  private static readonly CURRENT_USER = 'current-user';
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  user: User;
  userSubject: Subject<User> = new Subject(); // 1. mi sujeto que va a cambiar
  
  constructor(private http: HttpClient) { 
    // this.user = Object.assign(new User(), userData); // PORQUE HACER OBJECT ASSIGN Y PORQUE MUESTRA EL USER RARO?
    const userData = localStorage.getItem(SessionService.CURRENT_USER);
    this.user = JSON.parse(userData);
    this.notifyChanges();
  }
  
  authenticate(user: User):Observable<User | ApiError>{
    return this.http.post<User>(SessionService.SESSION_API, user, SessionService.defaultOptions)
    .pipe(
      map((user: User)=>{
        this.doAuthenticate(user);
        return user;
      }),
      catchError(this.handleError)
    )
  }
  
  doAuthenticate(user: User):void{
    this.user = user;
    localStorage.setItem(SessionService.CURRENT_USER, JSON.stringify(user));
  }
  
  isAuthenticated():any{
    return this.user ? true : false;
  }
  
  
  logout(){
    return this.http.delete<void>(SessionService.SESSION_API, SessionService.defaultOptions)
    .pipe(
      map(()=>{
        this.doLogout();
      }),
      catchError(this.handleError)
    )
  }
  
  //CUANDO HAGO LOGOUT EN LA API LA COOKIE
  // DESAPARECE PERO EL LOCALSTORAGE SIGUE ESTANDO Y TAMBIEN EL USER GUARDADO DEL LOCALSTORAGE
  doLogout(){
    console.log('LOGGED OUT FRONT');
    localStorage.removeItem(SessionService.CURRENT_USER);
    this.user = null;
    this.notifyChanges();
  }
  
  notifyChanges():void{
    this.userSubject.next(this.user); // 2. le paso los cambios que tiene que escuchar mi sujeto  
  }
  
  onUserChanges():Observable<User>{
    return this.userSubject.asObservable(); //3. retorno ese sujeto como observable
  }
  
  
  handleError(error: HttpErrorResponse):Observable<ApiError>{
    const apiError = new ApiError();
    if (error.error instanceof ErrorEvent) {
      apiError.message = 'Something went bad, try again';
    } else{
      apiError.message = error.error.message;
      apiError.errors = error.error.errors;
    }    
    return throwError(apiError);
  }
}
