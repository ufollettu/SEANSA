import { PacksHistory } from "./../../../models/packs-history";
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { Subscription } from "rxjs";
import { PacksHistoryApiService } from "src/app/services/api-services/packs-history-api.service";
import { AuthService } from "src/app/services/auth-services/auth.service";

@Component({
  selector: "app-packs-history-table",
  templateUrl: "./packs-history-table.component.html",
  styleUrls: ["./packs-history-table.component.css"]
})
export class PacksHistoryTableComponent implements OnInit, OnDestroy {
  loading;
  isAdmin: boolean;
  username: string;
  packsHistory: PacksHistory[];
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

  title: string;

  constructor(
    private packsHistoryApi: PacksHistoryApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private manager: DataComponentsManagementService,
    private authService: AuthService
  ) {
    this.title = "Pacchetti History";
    this.loading = true;
  }

  ngOnInit() {
    this.refreshPacksHistoryList();
    this.fetchUtenti();
  }

  refreshPacksHistoryList() {
    const packsHistList: Subscription = this.packsHistoryApi
      .getPacks()
      .subscribe(
        res => {
          this.mapPacksHistory(res);
          this.packsHistory = res;
          this.dataSource = new MatTableDataSource(this.packsHistory);
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
    this.manager.subscriptions.push(packsHistList);
  }

  mapPacksHistory(packsHistory: PacksHistory[]) {
    packsHistory.map(ph => {
      ph["username"] = this.manager.getUserName(ph["SPKH_SU_ID"]);
      return ph;
    });
  }

  fetchUtenti() {
    const fetchUsers: Subscription = this.manager.getUtenti().add(td => {
      this.refreshPacksHistoryList();
    });
    this.manager.subscriptions.push(fetchUsers);
  }
  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
