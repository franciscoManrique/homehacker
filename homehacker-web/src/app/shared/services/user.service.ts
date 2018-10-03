import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private static readonly REGISTER_API = `${environment.homehackerApi}/users`;
  private static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };
  
  constructor(private http: HttpClient) { }
  
  createUser(user: User):Observable<User>{ 
    return this.http.post<User>(UserService.REGISTER_API, user, UserService.defaultOptions)
    .pipe(
      map((user: User)=>{
        console.log(user);
        return user;
      })
    )
  }
}
