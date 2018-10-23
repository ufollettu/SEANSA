import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AuthService } from "../../../services/auth-services/auth.service";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { DialogService } from "../../../services/layout-services/dialog.service";
import { Router } from "@angular/router";
import { Packs } from "../../../models/packs";
import { PacksApiService } from "../../../services/api-services/packs-api.service";
import { Utente } from "../../../models/utente";
import { UtentiApiService } from "../../../services/api-services/utenti-api.service";
import { DataService } from "src/app/services/shared-services/data.service";

@Component({
  selector: "app-packs-table",
  templateUrl: "./packs-table.component.html",
  styleUrls: ["./packs-table.component.css"]
})
export class PacksTableComponent implements OnInit {
  loading;
  packs: Packs[];
  utenti: Utente[];
  isAdmin: boolean;

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

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private data: DataService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private api: PacksApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private utentiApi: UtentiApiService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.getIsAdmin();
    this.fetchUtenti();
    // this.refreshPacksList();
  }

  refreshPacksList() {
    this.api.getPacks().subscribe(
      res => {
        console.log(res);
        this.packs = res;
        this.dataSource = new MatTableDataSource(this.packs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.loading = false;
        this.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  noData(data: Packs[]) {
    if (data.length === 0) {
      this.notificationService.noData();
    }
  }

  deletePack(id: number) {
    this.dialogService
      .openConfirmDialog("sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.api.deletePack(id).subscribe(
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
  }

  fetchUtenti() {
    this.utentiApi.getUtenti().subscribe(
      utenti => {
        this.utenti = utenti;
        this.refreshPacksList();
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
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
    this.data.getAdminFromToken().subscribe(admin => {
      this.isAdmin = admin;
    });
  }
}
