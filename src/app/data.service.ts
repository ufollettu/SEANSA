import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  getUserFromToken() {
    const authService = this.injector.get(AuthService);
    const token: string = authService.getToken();

    const userIdToken = jwt_decode(token);

    return this.api.getUtente(userIdToken);
  }

  changeUser(user: object) {
    this.userSource.next(user);
  }
}
