import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { AuthService } from "../auth-services/auth.service";
import { UtentiApiService } from "../api-services/utenti-api.service";
import * as jwt_decode from "jwt-decode";
import { distinctUntilChanged } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private userSource = new BehaviorSubject({});
  currentUser = this.userSource.asObservable().pipe(distinctUntilChanged());

  constructor(
    private injector: Injector, 
    private authService: AuthService,
    private api: UtentiApiService
    ) {}

  getToken() {
    // const authService = this.injector.get(AuthService);
    const token = this.authService.getToken();
    if (token) {
      const userToken = jwt_decode(token);
      return userToken;
    }
    return null;
  }

  getUser() {
    return this.currentUser;
  }

  getUserFromToken() {
    const userToken = this.getToken() || {};
    return this.api.getUtente(userToken.userId);
  }

  getUserIdFromToken(): Observable<any> {
    const userToken = this.getToken() || "";
    return of(userToken.userId);
  }

  getPermissionsFromToken(): Observable<any> {
    const userToken = this.getToken() || [];
    return of(userToken.permArr);
  }

  getAdminFromToken(): Observable<any> {
    const userToken = this.getToken() || false;
    return of(userToken.isAdmin);
  }

  changeUser(user: object) {
    this.userSource.next(user);
  }
}
