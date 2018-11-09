import { NotificationService } from "../layout-services/notification.service";
import { map } from "rxjs/operators";
import { DataService } from "../shared-services/data.service";
import { PacksApiService } from "../api-services/packs-api.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class CheckPackResolverService implements Resolve<any> {
  constructor(
    private packsApiService: PacksApiService,
    private data: DataService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    rstate: RouterStateSnapshot
  ): Observable<any> {
    const ownerId = parseInt(route.fragment, 10);
    // const ownerId = route.fragment;
    // console.log(ownerId);
    return this.packsApiService.getPackFromOwnerId(ownerId).pipe(
      map(packs => {
        if (!packs.filter(this.filterPacks)) {
          return true;
        } else {
          const remLic = [];
          const expLic = [];

          packs.forEach(p => {
            const rem = p["SPK_SKS_COUNT"] - p["SPK_USED_SKS_COUNT"];
            remLic.push(rem);
            const exp = p["SPK_EXPIRE"] < moment().format("YYYY-MM-DD");
            expLic.push(exp);
          });

          if (expLic.every(this.isExpired)) {
            this.notificationService.warn("your packs are expired");
            this.router.navigate(["/sks"]);
            return;
          }

          if (remLic.every(this.isEmpty)) {
            this.notificationService.warn("your packs are empty");
            this.router.navigate(["/sks"]);
            return;
          }

          if (packs.filter(this.filterPacks).length === 0) {
            this.notificationService.warn("your packs are empty or expired");
            this.router.navigate(["/sks"]);
            return;
          }

          this.notificationService.success(`your have available packs`);
          return packs.filter(this.filterPacks);
        }
      })
    );
  }

  isEmpty(currentValue) {
    return currentValue < 1;
  }

  isExpired(currentValue) {
    return currentValue === true;
  }

  filterPacks(value) {
    if (
      value["SPK_SKS_COUNT"] - value["SPK_USED_SKS_COUNT"] > 0 &&
      value["SPK_EXPIRE"] > moment().format("YYYY-MM-DD")
    ) {
      return value;
    }
  }
}
