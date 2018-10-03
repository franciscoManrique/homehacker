import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: FormGroup;
  user: User = new User();
  
  constructor(private sessionService: SessionService) { }
  
  onSubmitLogin(loginForm: FormGroup){
    if (this.loginForm.valid) {
      this.sessionService.authenticate(this.user).subscribe((user: User)=>{
        console.log(user);
        
      });
    }
  }
}
