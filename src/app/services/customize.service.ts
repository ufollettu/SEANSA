import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {

  private themeSource = new BehaviorSubject('default-theme');
  currentTheme = this.themeSource.asObservable().pipe(distinctUntilChanged());

  constructor(public overlayContainer: OverlayContainer) { }

  changeTheme(theme) {
    this.themeSource.next(theme);
  }

  getTheme() {
    return this.currentTheme;
  }
}
