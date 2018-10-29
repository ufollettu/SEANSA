import { PacksHistory } from "./../../../models/packs-history";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AuthService } from "../../../services/auth-services/auth.service";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { PacksHistoryApiService } from "../../../services/api-services/packs-history-api.service";
import { Utente } from "../../../models/utente";
import { UtentiApiService } from "../../../services/api-services/utenti-api.service";

@Component({
  selector: "app-packs-history-table",
  templateUrl: "./packs-history-table.component.html",
  styleUrls: ["./packs-history-table.component.css"]
})
export class PacksHistoryTableComponent implements OnInit {
  loading;
  packsHistory: PacksHistory[];
  utenti: Utente[];
  isAdmin: boolean;
  username: string;
  // tslint:disable-next-line:max-line-length
  displayedColumns = [
    "SPKH_ID",
    "SPKH_SPK_ID",
    "SPKH_SU_ID",
    "SPKH_SS_ID",
    "SPKH_ACTION",
    "SPKH_TS"
  ];
  dataSource: any;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private api: PacksHistoryApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private utentiApi: UtentiApiService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.fetchUtenti();
  }

  refreshPacksHistoryList() {
    this.api.getPacks().subscribe(
      res => {
        this.packsHistory = res;
        this.dataSource = new MatTableDataSource(this.packsHistory);
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

  noData(data: PacksHistory[]) {
    if (data.length === 0) {
      this.notificationService.noData();
    }
  }

  fetchUtenti() {
    this.utentiApi.getUtenti().subscribe(
      utenti => {
        this.utenti = utenti;
        this.refreshPacksHistoryList();
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
}
