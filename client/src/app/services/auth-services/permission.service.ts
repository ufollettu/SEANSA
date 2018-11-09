import { Injectable, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../shared-services/data.service";

@Injectable({
  providedIn: "root"
})
export class PermissionService {
  permissions = [];

  constructor(private data: DataService) {
    this.getPerms();
  }

  getPerms() {
    this.data.getPermissionsFromToken().subscribe(permsArr => {
      this.permissions = permsArr || [];
    });
  }

  createUserEnable() {
    return this.permissions.includes(0);
  }

  userPwdResetEnable() {
    return this.permissions.includes(1);
  }

  deleteUserEnable() {
    return this.permissions.includes(2);
  }

  userLevelChangeEnable() {
    return this.permissions.includes(3);
  }

  licenseRenewEnable() {
    return this.permissions.includes(4);
  }

  licenseManagerEnable() {
    return this.permissions.includes(5);
  }

  customerManagerEnable() {
    return this.permissions.includes(6);
  }

  pcManagerEnable() {
    return this.permissions.includes(7);
  }

  serialsManagerEnable() {
    return this.permissions.includes(8);
  }

  packManagerEnable() {
    return this.permissions.includes(9);
  }
}
