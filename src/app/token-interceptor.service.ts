import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authService = this.injector.get(AuthService);
      const token: string = authService.getToken();

      if (token) {
        // console.log(token);
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
}
