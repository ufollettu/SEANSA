import { Observable } from 'rxjs';
import { AuthService } from '../auth-services/auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { DataService } from '../shared-services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  user: object;

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const dataService = this.injector.get(DataService);
    const token: string = authService.getToken();
    dataService.currentUser.subscribe(loggedUser => this.user = loggedUser);

    if (token) {
      // // TODO check if user token is equals to user edit
      // const idToken = jwt_decode(token);
      // if (idToken === this.user['SU_ID']) {
      //   console.log('ok');
      // } else {
      //   console.log('not ok');
      // }
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // if (!req.headers.has('Content-Type')) {
    //     req = req.clone({
    //       headers: req.headers.set('Content-Type', 'application/json')
    //     });
    // }
    // req = req.clone({
    //   headers: req.headers.set('Accept', 'application/json')
    // });

    return next.handle(req);
  }

  // getUser() {
  //   this.dataService.currentUser.subscribe(user => this.user = user);
  // }
}
