import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from '../auth-services/auth.service';
import { UtentiApiService } from '../api-services/utenti-api.service';
import * as jwt_decode from "jwt-decode";
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSource = new BehaviorSubject({});
  currentUser = this.userSource.asObservable().pipe(distinctUntilChanged());

  constructor(private injector: Injector, private api: UtentiApiService) { }

  getUser() {
    return this.currentUser;
  }

  getUserFromToken() {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const userIdToken = jwt_decode(token);
    return this.api.getUtente(userIdToken.userId);
  }

  getPermissionsFromToken(): Observable<any> {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const userIdToken = jwt_decode(token);
    return of(userIdToken.permArr);
  }

  getAdminFromToken(): Observable<any> {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const userIdToken = jwt_decode(token);
    return of(userIdToken.isAdmin);
  }

  changeUser(user: object) {
    this.userSource.next(user);
  }

}
