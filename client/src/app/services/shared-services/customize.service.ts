import { Injectable, OnInit } from "@angular/core";
import { OverlayContainer } from "@angular/cdk/overlay";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/customization";

@Injectable({
  providedIn: "root"
})
export class CustomizeService {
  private themeSource = new BehaviorSubject(this.getThemeFromToken());
  currentTheme = this.themeSource.asObservable().pipe(distinctUntilChanged());

  private logoSource = new BehaviorSubject(this.getLogoFromToken());
  currentLogo = this.logoSource.asObservable().pipe(distinctUntilChanged());

  // Custom color picker
  // TODO set default color in BehSub by user logged in
  private primaryColorSource = new BehaviorSubject(
    this.getColorsFromToken()[0]
  );
  currentPrimaryColor = this.primaryColorSource
    .asObservable()
    .pipe(distinctUntilChanged());

  private accentColorSource = new BehaviorSubject(this.getColorsFromToken()[1]);
  currentAccentColor = this.accentColorSource
    .asObservable()
    .pipe(distinctUntilChanged());

  private warnColorSource = new BehaviorSubject(this.getColorsFromToken()[2]);
  currentWarnColor = this.warnColorSource
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(public overlayContainer: OverlayContainer) {}

  // built-in themes
  changeTheme(theme) {
    this.themeSource.next(theme);
  }

  getTheme() {
    return this.currentTheme;
  }

  getThemeFromToken() {
    return localStorage.getItem("customStyle") || "default-theme";
  }

  // Logo
  changeLogo(logo) {
    this.logoSource.next(logo);
  }

  getLogo() {
    return this.currentLogo;
  }

  getLogoFromToken() {
    return localStorage.getItem("customLogo") || "raniero.png";
  }

  // Custom color picker
  changePrimaryColor(pColor) {
    this.primaryColorSource.next(pColor);
    document.body.style.setProperty("--primary-color", pColor);
  }
  getPrimaryColor() {
    return this.currentPrimaryColor;
  }

  changeAccentColor(aColor) {
    this.accentColorSource.next(aColor);
    document.body.style.setProperty("--accent-color", aColor);
  }
  getAccentColor() {
    return this.currentAccentColor;
  }

  changeWarnColor(wColor) {
    this.warnColorSource.next(wColor);
    document.body.style.setProperty("--warn-color", wColor);
  }
  getWarnColor() {
    return this.currentWarnColor;
  }

  getColorsFromToken() {
    const colorsString =
      localStorage.getItem("customColors") ||
      "rgb(0,0,255)|rgb(255,255,0)|rgb(255,0,0)";
    return colorsString.split("|");
  }
}
