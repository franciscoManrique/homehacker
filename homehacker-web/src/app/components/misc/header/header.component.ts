import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../shared/services/session.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggleMenu: boolean = true;
  user: User;
  userSuscriptor: Subscription;
  
  constructor(private sessionService: SessionService, private router: Router) { }
  
  ngOnInit() {
    this.user = this.sessionService.user;
    this.userSuscriptor = this.sessionService.onUserChanges()
    .subscribe((user: User)=>{
      this.user = user;
    })
  }

  // ngOnInit() {
  //   this.user = this.sessionService.user;
  //   this.onUserChanges = this.sessionService.onUserChanges()
  //     .subscribe((user: User) => this.user = user);
  // }
  
  showMenu(){
    this.toggleMenu = !this.toggleMenu;
    console.log(this.toggleMenu);
  }
  
  onClickLogOut(){
    this.sessionService.logout().subscribe(()=>{
      console.log('Logged out from header');
      // this.router.navigate(['/login']);
    });
  }
}
