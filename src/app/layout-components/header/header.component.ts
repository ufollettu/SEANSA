import { Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
// import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/shared-services/data.service';
import { CustomizeService } from '../../services/shared-services/customize.service';
import { SidenavService } from 'src/app/services/layout-services/sidenav.service';
import { PermissionService } from 'src/app/services/auth-services/permission.service';

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
    private sideNavService: SidenavService,
    private authService: AuthService,
    private data: DataService,
    private permsService: PermissionService,
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
      console.log(logo);
      if (logo.startsWith('logo')) {
        this.logoPath = 'assets/images/' + logo;
      } else if (logo.startsWith('raniero')) {
        this.logoPath = 'assets/images/' + logo;
      } else {
        this.logoPath = logo;

      }
      this.cdRef.detectChanges();
    });
  }

  toggleSideNav() {
    this.permsService.getPerms();
    this.sideNavService.toggle();
  }

}
