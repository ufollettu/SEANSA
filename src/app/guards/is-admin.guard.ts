import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-services/auth.service';
import { NotificationService } from '../services/layout-services/notification.service';
import { DataService } from '../services/shared-services/data.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private data: DataService
  ) {
    this.getAdmin();
  }

  canActivate(): boolean {
    if (this.isAdmin) {
      return true;
    } else {
      this.notificationService.warn('you do not have admin permission');
      this.router.navigate(['/login']);
      return false;
    }
  }

  getAdmin() {
    this.data.getAdminFromToken().subscribe(admin => {
      this.isAdmin = admin;
    });
  }
}
