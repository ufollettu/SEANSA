import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth-services/auth.service";
import { NotificationService } from "../services/layout-services/notification.service";
import { DataService } from "../services/shared-services/data.service";

@Injectable({
  providedIn: "root"
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private data: DataService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.data.getAdminFromTokenBool()) {
      // console.log("is admin");
      return true;
    } else {
      // console.log("is not admin");
      this.notificationService.warn("you do not have admin permission");
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
