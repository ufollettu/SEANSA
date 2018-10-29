import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
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

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private data: DataService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dataComponentsManagementService: DataComponentsManagementService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.getUserFromLocalStorage();
    this.getIsAdmin();
    this.fetchUtenti();
  }

  refreshPacksList() {
    this.dataComponentsManagementService.refreshPacksList().add(td => {
      this.dataSource = new MatTableDataSource(
        this.dataComponentsManagementService.packs
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
      this.loading = false;
    });
  }

  onNoData(data: Packs[]) {
    this.dataComponentsManagementService.noData(data);
  }

  onDeletePack(id: number) {
    this.dataComponentsManagementService.deletePack(id).add(td => {
      this.refreshPacksList();
    });
  }

  fetchUtenti() {
    this.dataComponentsManagementService.getUtenti().add(td => {
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
