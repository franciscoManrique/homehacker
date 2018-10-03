import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggleMenu: boolean = true;
  user2: string = 'hola';

  constructor() { }

  ngOnInit() {
  }

  showMenu(){
    this.toggleMenu = !this.toggleMenu;
    console.log(this.toggleMenu);
    
  }

}
