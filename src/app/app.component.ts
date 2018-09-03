import { Component, AfterViewInit, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomizeService } from './services/customize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  loading;
  // theme: string;
  @HostBinding('class') componentCssClass;

  constructor(
    private router: Router,
    public overlayContainer: OverlayContainer,
    private customizeService: CustomizeService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.getTheme();
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (
          event instanceof NavigationEnd || event instanceof NavigationCancel
        ) {
          this.loading = false;
        }
      });
  }

  getTheme() {
    this.customizeService.getTheme().subscribe(theme => {
      this.overlayContainer.getContainerElement().classList.add(theme);
      this.componentCssClass = theme;
    });
    // this.sendTheme(theme);
  }

}
