import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-services/auth.service';
import { NotificationService } from '../services/layout-services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.notificationService.warn('you do not have admin permission');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
