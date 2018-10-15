import { Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
// import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/shared-services/data.service';
import { CustomizeService } from '../../services/shared-services/customize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: object;
  userId: string;
  username: string;
  logoPath: string;
  defaultLogoPath = 'assets/images/raniero.png';
  changeLog;

  constructor(
    private router: Router,
    private authService: AuthService,
    private data: DataService,
    private customizeService: CustomizeService,
    // private renderer: Renderer2,
    // private el: ElementRef
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getUser();
    this.getLogo();
    this.getUserFromLocalStorage();
    // this.getLogoFromLocalStorage();
  }

  getUser() {
    this.data.getUser().subscribe(utente => {
      this.user = utente;
      this.userId = utente['SU_ID'];
      // this.sendUser(this.user);
    });
  }

  onLogout() {
    this.customizeService.changeTheme('default-theme');
    this.authService.logoutUser();
  }

  sendUser(user) {
    this.data.changeUser(user);
  }

  getUserFromLocalStorage() {
    const localUsername = localStorage.getItem('userName');
    this.username = localUsername;
  }

  getLogo() {
    this.customizeService.getLogo().subscribe(logo => {
      if (logo.length > 200) {
        this.logoPath = logo;
      } else {
        this.logoPath = 'assets/images/' + logo;
      }
      this.cdRef.detectChanges();
    });
  }
  // getLogoFromLocalStorage() {
  //   const localLogoPath = localStorage.getItem('customLogo');
  //   // console.log(localLogoPath);
  //   this.logoPath = 'assets/images/' + localLogoPath;
  //   this.cdRef.detectChanges();
  // }
}
