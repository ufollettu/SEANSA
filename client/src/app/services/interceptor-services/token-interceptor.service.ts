import { Observable } from "rxjs";
import { AuthService } from "../auth-services/auth.service";
import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { DataService } from "../shared-services/data.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
  user: object;

  constructor(private injector: Injector) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const dataService = this.injector.get(DataService);
    const token: string = authService.getToken();
    dataService.currentUser.subscribe(loggedUser => (this.user = loggedUser));

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
