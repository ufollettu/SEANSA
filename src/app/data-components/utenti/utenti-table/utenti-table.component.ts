import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";
import { AuthService } from "../../../services/auth-services/auth.service";

@Component({
  selector: "app-utenti-table",
  templateUrl: "./utenti-table.component.html",
  styleUrls: ["./utenti-table.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class UtentiTableComponent implements OnInit {
  loading;
  currentUsername;

  displayedColumns = [
    "SU_UNA",
    "SU_LAST_IP",
    "SU_LAST_LOGIN",
    "SU_CREATION",
    "SU_LAST_EDIT",
    "actions"
  ];
  dataSource: any;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private authService: AuthService,
    private manager: DataComponentsManagementService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.getUsername();
    this.refreshUsersList();
  }

  getUsername() {
    this.currentUsername = this.authService.getUsername();
  }

  refreshUsersList() {
    this.manager.refreshUsersList().add(td => {
      this.dataSource = new MatTableDataSource(this.manager.utenti);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
      this.loading = false;
    });
  }

  deleteUser(id: number) {
    this.manager.deleteUser(id).add(td => {
      this.refreshUsersList();
    });
  }
}
