import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { DataService } from "src/app/services/shared-services/data.service";
import * as moment from "moment";

@Component({
  selector: "app-packs-table",
  templateUrl: "./packs-table.component.html",
  styleUrls: ["./packs-table.component.css"]
})
export class PacksTableComponent implements OnInit {
  loading;
  isAdmin: boolean;
  username: string;
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

  constructor(
    private data: DataService,
    private changeDetectorRefs: ChangeDetectorRef,
    private manager: DataComponentsManagementService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.warningDate = moment().format("YYYY-MM-DD");
    this.getUserFromLocalStorage();
    this.getIsAdmin();
    this.fetchUtenti();
  }

  refreshPacksList() {
    this.manager.refreshPacksList().add(td => {
      this.dataSource = new MatTableDataSource(this.manager.packs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
      this.loading = false;
    });
  }

  checkExpDate(expDate) {
    if (expDate <= this.warningDate) {
      return "red";
    }
    return "";
  }

  onDeletePack(id: number) {
    this.manager.deletePack(id).add(td => {
      this.refreshPacksList();
    });
  }

  fetchUtenti() {
    this.manager.getUtenti().add(td => {
      this.refreshPacksList();
    });
  }

  getIsAdmin() {
    this.data.getAdminFromToken().subscribe(admin => {
      this.isAdmin = admin;
    });
  }

  getUserFromLocalStorage() {
    const localUsername = localStorage.getItem("userName");
    this.username = localUsername;
  }
}
