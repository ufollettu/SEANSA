import { NotificationService } from "./../../../services/layout-services/notification.service";
import { DialogService } from "./../../../services/layout-services/dialog.service";
import { AuthService } from "./../../../services/auth-services/auth.service";
import { Packs } from "src/app/models/packs";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { DataService } from "src/app/services/shared-services/data.service";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { PacksApiService } from "src/app/services/api-services/packs-api.service";
import { UtentiApiService } from "src/app/services/api-services/utenti-api.service";
import { Utente } from "src/app/models/utente";
import { PacksHistoryApiService } from "src/app/services/api-services/packs-history-api.service";

@Component({
  selector: "app-packs-table",
  templateUrl: "./packs-table.component.html",
  styleUrls: ["./packs-table.component.css"]
})
export class PacksTableComponent implements OnInit, OnDestroy {
  loading;
  isAdmin: boolean;
  username: string;
  packs: Packs[];
  utenti: Utente[];
  // tslint:disable-next-line:max-line-length
  displayedColumns = [
    "SPK_SU_CREATOR_ID",
    "SPK_SU_OWNER_ID",
    "SPK_CREATED",
    "SPK_EXPIRE",
    "SPK_SKS_COUNT",
    "SPK_USED_SKS_COUNT",
    "actions"
  ];
  dataSource: any;
  warningDate: any;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  title: string;

  constructor(
    private data: DataService,
    private packsApi: PacksApiService,
    private utentiApi: UtentiApiService,
    private packsHistoryApi: PacksHistoryApiService,
    private authService: AuthService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private changeDetectorRefs: ChangeDetectorRef,
    private manager: DataComponentsManagementService
  ) {
    this.title = "Pacchetti";
    this.loading = true;
  }

  ngOnInit() {
    this.warningDate = moment().format("YYYY-MM-DD");
    this.getUserFromLocalStorage();
    this.getIsAdmin();
    this.fetchUtenti();
  }

  refreshPacksList() {
    const listPacks: Subscription = this.packsApi.getPacks().subscribe(
      res => {
        this.packs = res;
        this.mapPacks(res);
        this.dataSource = new MatTableDataSource(this.packs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.loading = false;
        this.manager.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
    this.manager.subscriptions.push(listPacks);
  }

  mapPacks(packs: Packs[]) {
    packs.map(pack => {
      pack["ownerUsername"] = this.getUserName(pack["SPK_SU_OWNER_ID"]);
      pack["creatorUsername"] = this.getUserName(pack["SPK_SU_CREATOR_ID"]);
      return pack;
    });
  }

  checkExpDate(expDate) {
    if (expDate <= this.warningDate) {
      return "red";
    }
    return "";
  }

  onDeletePack(id: number, owner) {
    const deletePack: Subscription = this.dialogService
      .openConfirmDialog("sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.packsApi.deletePack(id).subscribe(
            pack => {
              this.packsHistoryApi
              .postPack({
                SPKH_SPK_ID: id,
                SPKH_SU_ID: owner,
                SPKH_ACTION: "pack deleted"
              })
              .subscribe(
                ph => {
                  console.log("new history row created");
                },
                err => console.log(err)
              );
              this.notificationService.warn(`pacchetto rimosso`);
              this.refreshPacksList();
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
    this.manager.subscriptions.push(deletePack);
  }

  fetchUtenti() {
    const fetchUser: Subscription = this.utentiApi.getUtenti().subscribe(
      utenti => {
        this.utenti = utenti;
        this.refreshPacksList();
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
    this.manager.subscriptions.push(fetchUser);
  }

  getUserName(id) {
    let result = "";
    this.utenti.forEach(utente => {
      if (utente["SU_ID"] === id) {
        result = utente["SU_UNA"];
      }
    });
    return result;
  }

  getIsAdmin() {
    const getAdmin: Subscription = this.data
      .getAdminFromToken()
      .subscribe(admin => {
        this.isAdmin = admin;
      });
    this.manager.subscriptions.push(getAdmin);
  }

  getUserFromLocalStorage() {
    const localUsername = localStorage.getItem("userName");
    this.username = localUsername;
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
