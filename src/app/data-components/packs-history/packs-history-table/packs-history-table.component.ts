import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";

@Component({
  selector: "app-packs-history-table",
  templateUrl: "./packs-history-table.component.html",
  styleUrls: ["./packs-history-table.component.css"]
})
export class PacksHistoryTableComponent implements OnInit {
  loading;
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
    private changeDetectorRefs: ChangeDetectorRef,
    private manager: DataComponentsManagementService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.refreshPacksHistoryList();
    this.fetchUtenti();
  }

  refreshPacksHistoryList() {
    this.manager.refreshPacksHistoryList().add(td => {
      this.dataSource = new MatTableDataSource(this.manager.packsHistory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
      this.loading = false;
    });
  }

  fetchUtenti() {
    this.manager.getUtenti().add(td => {
      this.refreshPacksHistoryList();
    });
  }
}
