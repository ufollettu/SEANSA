// import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: object;

  constructor(private router: Router, private authService: AuthService, private data: DataService) { }


  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.data.getUser().subscribe(utente => {
      this.user = utente;
    });
    this.sendUser(this.user);
  }

  onLogout() {
    this.authService.logoutUser();
  }

  sendUser(user) {
    this.data.changeUser(user);
  }
}
