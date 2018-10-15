import { NotificationService } from "./../layout-services/notification.service";
import { map } from "rxjs/operators";
import { DataService } from "./../shared-services/data.service";
import { PacksApiService } from "./../api-services/packs-api.service";
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
      map(pack => {
        if (!pack[0]) {
          return true;
        } else {
          const remainingLicense =
            pack[0]["SPK_SKS_COUNT"] - pack[0]["SPK_USED_SKS_COUNT"];
          if (remainingLicense === 0) {
            this.notificationService.warn("your pack is empty");
            this.router.navigate(["/sks"]);
          } else if (pack[0]["SPK_EXPIRE"] < moment().format("YYYY-MM-DD")) {
            this.notificationService.warn("your pack is expired");
            this.router.navigate(["/sks"]);
          } else {
            this.notificationService.success(
              `your have ${remainingLicense} licence remaining`
            );
            return pack;
          }
        }
      })
    );
  }
}
