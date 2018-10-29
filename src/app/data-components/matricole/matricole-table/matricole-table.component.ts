import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Matricola } from "./../../../models/matricola";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatricoleApiService } from "../../../services/api-services/matricole-api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSort, MatTableDataSource } from "@angular/material";
import { DialogService } from "../../../services/layout-services/dialog.service";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";

@Component({
  selector: "app-matricole-table",
  templateUrl: "./matricole-table.component.html",
  styleUrls: ["./matricole-table.component.css"],
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
export class MatricoleTableComponent implements OnInit {
  loading;
  matricole: any;
  sksId: any;

  displayedColumns = [
    "SM_MATRICOLA",
    "SM_SS_ID",
    "SM_DETTAGLI",
    "SM_CREATION_DATE",
    "SM_LAST_UPDATE",
    "actions"
  ];
  dataSource: any;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dataComponentsManagementService: DataComponentsManagementService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.sksId = this.route.snapshot.params["sksId"];
    this.refreshMatricoleList();
  }

  refreshMatricoleList() {
    this.dataComponentsManagementService
      .getMatricoleBySks(this.sksId)
      .add(td => {
        this.dataSource = new MatTableDataSource(
          this.dataComponentsManagementService.matricole
        );
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.loading = false;
      });
  }

  onNoData(data: Matricola[]) {
    this.dataComponentsManagementService.noData(data);
  }

  onDeleteMatricola(id) {
    this.dataComponentsManagementService.deleteMatricola(id).add(tearDown => {
      this.refreshMatricoleList();
    });
  }
}
