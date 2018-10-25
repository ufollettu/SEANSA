import { Injectable, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/api/customization';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {


  private themeSource = new BehaviorSubject(this.getThemeFromToken());
  currentTheme = this.themeSource.asObservable().pipe(distinctUntilChanged());

  private logoSource = new BehaviorSubject(this.getLogoFromToken());
  currentLogo = this.logoSource.asObservable().pipe(distinctUntilChanged());

  constructor(
    public overlayContainer: OverlayContainer
  ) { }

  changeTheme(theme) {
    this.themeSource.next(theme);
  }

  getTheme() {
    return this.currentTheme;
  }

  getThemeFromToken() {
    return localStorage.getItem('customStyle') || 'default-theme';
  }

  changeLogo(logo) {
    this.logoSource.next(logo);
  }

  getLogo() {
    return this.currentLogo;
  }

  getLogoFromToken() {
    return localStorage.getItem('customLogo') || 'raniero.png';
  }
}
