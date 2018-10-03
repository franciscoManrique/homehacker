import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { ApiError } from '../../models/api-error.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  private static readonly REGISTER_API = `${environment.homehackerApi}/sessions`;
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  user: User;
  constructor(private http: HttpClient) { }
  
  authenticate(user: User):Observable<User | ApiError>{
    console.log('do auth');
    return this.http.post<User>(SessionService.REGISTER_API, user, SessionService.defaultOptions)
    .pipe(
      map((user: User)=>{
        this.doAuthenticate(user);
        return user;
      }),
      catchError(this.handleError)
    )
  }
  
  doAuthenticate(user: User): void{
   
  }
  
  handleError(error: HttpErrorResponse): Observable<ApiError>{
    return 
  }
}
