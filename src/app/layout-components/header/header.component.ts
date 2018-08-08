// import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: object;
  username: string;

  constructor(private router: Router, private authService: AuthService, private data: DataService) { }


  ngOnInit() {
    this.getUser();
    this.getUserFromLocalStorage();
  }

  getUser() {
    this.data.getUser().subscribe(utente => {
      this.user = utente;
      console.log(this.user);
    });
    // this.sendUser(this.user);
  }

  onLogout() {
    this.authService.logoutUser();
  }

  sendUser(user) {
    this.data.changeUser(user);
  }

  getUserFromLocalStorage() {
    this.username = localStorage.getItem('userName');
  }
}
