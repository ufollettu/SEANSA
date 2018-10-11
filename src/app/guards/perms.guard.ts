import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/shared-services/data.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PermsGuard implements CanActivate {

  permissions: number[];

  constructor(private data: DataService, private location: Location) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedPerm = route.data.expectedPerm;
    this.getPermsArr();

    if (this.permissions.includes(expectedPerm)) {
      // console.log('allowed');
      return true;
    } else {
      alert('you are not allowed to use this resource');
      this.location.back();
      return false;
    }
  }

  getPermsArr() {
    this.data.getPermissionsFromToken().subscribe(permsArr => {
      this.permissions = permsArr;
    });
  }

}
