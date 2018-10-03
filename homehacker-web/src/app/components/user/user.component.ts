import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('registerForm') registerForm: FormGroup;
  user: User = new User();
  user2: string = 'hola';

  constructor(private userService:UserService, private router: Router) { }
  
  ngOnInit() {
  }

  onSubmitRegister(){      
    if (this.registerForm.valid) {
      this.userService.createUser(this.user).subscribe((user:User)=>{
        console.log('USER CREATED');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      });
    }
  }
  
}
