import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-services/auth.service';
import { NotificationService } from '../services/layout-services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.notificationService.warn('you\'re not logged in');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
