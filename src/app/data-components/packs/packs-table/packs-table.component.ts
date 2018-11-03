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
      pack["ownerUsername"] = this.manager.getUserName(pack["SPK_SU_OWNER_ID"]);
      pack["creatorUsername"] = this.manager.getUserName(
        pack["SPK_SU_CREATOR_ID"]
      );
      return pack;
    });
  }

  checkExpDate(expDate) {
    if (expDate <= this.warningDate) {
      return "red";
    }
    return "";
  }

  onDeletePack(id: number) {
    const deletePack: Subscription = this.dialogService
      .openConfirmDialog("sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.packsApi.deletePack(id).subscribe(
            pack => {
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
    const fetchUsers: Subscription = this.manager.getUtenti().add(td => {
      this.refreshPacksList();
    });
    this.manager.subscriptions.push(fetchUsers);
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
