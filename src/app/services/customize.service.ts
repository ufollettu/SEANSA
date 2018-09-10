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
    public overlayContainer: OverlayContainer,
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error);

  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

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
    console.log(logo);
    this.logoSource.next(logo);
  }

  getLogo() {
    return this.currentLogo;
  }

  getLogoFromToken() {
    return localStorage.getItem('customLogo') || 'raniero.png';
  }
}
