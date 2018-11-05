import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Location } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { AuthService } from "../../services/auth-services/auth.service";
import { DataService } from "../../services/shared-services/data.service";
import { CustomizeService } from "../../services/shared-services/customize.service";
import { SidenavService } from "src/app/services/layout-services/sidenav.service";
import { PermissionService } from "src/app/services/auth-services/permission.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  user: object;
  userId: string;
  username: string;
  logoPath: string;
  defaultLogoPath = "assets/images/raniero.png";
  changeLog;
  @Input()
  listUrl;

  constructor(
    private sideNavService: SidenavService,
    public authService: AuthService,
    private data: DataService,
    private permsService: PermissionService,
    private customizeService: CustomizeService,
    private location: Location,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
    this.getLogo();
    this.getUserFromLocalStorage();
  }

  getUser() {
    this.data
      .getUser()
      .pipe(take(1))
      .subscribe(utente => {
        this.user = utente;
        this.userId = utente["SU_ID"];
        // this.sendUser(this.user);
      });
  }

  onLogout() {
    this.customizeService.changeTheme("default-theme");
    this.authService.logoutUser();
  }

  sendUser(user) {
    this.data.changeUser(user);
  }

  getUserFromLocalStorage() {
    const localUsername = localStorage.getItem("userName");
    this.username = localUsername;
  }

  getLogo() {
    this.customizeService.getLogo().subscribe(logo => {
      if (logo.startsWith("logo") || logo.startsWith("raniero")) {
        this.logoPath = "assets/images/" + logo;
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
