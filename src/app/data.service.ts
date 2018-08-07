import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UtentiApiService } from './utenti/utenti-api.service';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSource = new BehaviorSubject({});
  currentUser = this.userSource.asObservable();

  constructor(private injector: Injector, private api: UtentiApiService) { }

  getUser() {
    return this.currentUser;
  }

  getUserFromToken() {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const userIdToken = jwt_decode(token);
    // console.log(userIdToken);
    return this.api.getUtente(userIdToken.userId);
  }

  getPermissionsFromToken(): Observable<any> {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const userIdToken = jwt_decode(token);

    return of(userIdToken.permArr);
  }
  changeUser(user: object) {
    this.userSource.next(user);
  }

}
