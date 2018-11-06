import { MatSidenav } from "@angular/material";
import { ViewChild, ViewEncapsulation, OnChanges } from "@angular/core";
import { Component, AfterViewInit, HostBinding, OnInit } from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel
} from "@angular/router";
import { OverlayContainer } from "@angular/cdk/overlay";
import { CustomizeService } from "./services/shared-services/customize.service";
import { FocusMonitor } from "@angular/cdk/a11y";
import { SidenavService } from "./services/layout-services/sidenav.service";
import { PermissionService } from "./services/auth-services/permission.service";
import { DataService } from "./services/shared-services/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit, OnInit {
  isAdmin: boolean;
  loading: boolean;
  customTheme;
  customColors;
  passedUrl: string;
  // theme: string;
  @HostBinding("class")
  componentCssClass;
  @ViewChild("sidenav")
  public sidenav: MatSidenav;

  constructor(
    private router: Router,
    private data: DataService,
    public permsService: PermissionService,
    private sidenavService: SidenavService,
    private focusMonitor: FocusMonitor,
    public overlayContainer: OverlayContainer,
    private customizeService: CustomizeService
  ) {
    this.loading = true;
    this.isAdmin = false;
  }

  ngOnInit() {
    this.customTheme = this.getTheme();
    // this.sendTheme(this.customTheme);
    this.customColors = this.getColors();
    this.sendColors(this.customColors);
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngAfterViewInit() {
    this.focusMonitor.stopMonitoring(document.getElementById("home"));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.loading = false;
        // console.log(this.data.getAdminFromTokenBool());
        if (!this.data.getAdminFromTokenBool()) {
          this.isAdmin = false;
        } else {
          this.isAdmin = true;
        }
      }
    });
  }

  setTitle(component: string) {
    // console.log(component["title"]);
    this.passedUrl = component["title"];
  }

  getTheme() {
    this.customizeService.getTheme().subscribe(theme => {
      this.overlayContainer.getContainerElement().classList.add(theme);
      this.componentCssClass = theme || this.getLogoFromLocalStorage();
    });
    // this.sendTheme(theme);
  }

  getLogoFromLocalStorage() {
    return localStorage.getItem("customStyle");
  }

  getColors() {
    return this.customizeService.getColorsFromToken();
  }

  sendColors(colors) {
    this.customizeService.changePrimaryColor(colors[0]);
    this.customizeService.changeAccentColor(colors[1]);
    this.customizeService.changeWarnColor(colors[2]);
  }

  sendTheme(theme) {
    this.customizeService.changeTheme(theme);
  }

  closeSidenav() {
    this.sidenavService.close();
    this.data.changeUrl(this.router.url);
  }
}
