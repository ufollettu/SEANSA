import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { PcApiService } from "../../../services/api-services/pc-api.service";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { Observable } from "rxjs";
import { Pc } from "../../../models/pc";
import { AuthService } from "../../../services/auth-services/auth.service";
import { PermissionService } from "src/app/services/auth-services/permission.service";

@Component({
  selector: "app-pc-table",
  templateUrl: "./pc-table.component.html",
  styleUrls: ["./pc-table.component.css"],
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
export class PcTableComponent implements OnInit {
  loading;
  pc: Pc[];
  isBanned = false;

  displayedColumns = [
    "SP_HW_ID",
    "SP_IP",
    "SP_STATUS",
    "SP_LAST_RX",
    "SP_PC_DATE_TIME",
    "actions"
  ];
  dataSource: any;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private notificationService: NotificationService,
    private api: PcApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.refreshPcsList();
  }

  refreshPcsList() {
    this.api.getPcs().subscribe(
      res => {
        this.mapPcs(res);
        this.pc = res;
        this.dataSource = new MatTableDataSource(this.pc);
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

  noData(data: Pc[]) {
    if (data.length === 0) {
      this.notificationService.noData();
    }
  }

  mapPcs(pcs: Pc[]) {
    pcs.map(pc => {
      pc["statusDescription"] = pc["SP_STATUS"] ? "bannato" : "non bannato";
      return pc;
    });
  }

  banPc(id: number) {
    const status = 1;
    this.api.updatePc(id, { SP_STATUS: status }).subscribe(
      res => {
        this.notificationService.warn(`pc ${res["SP_HW_ID"]} bannato`);
        this.refreshPcsList();
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  unbanPc(id: number) {
    const status = 0;
    this.api.updatePc(id, { SP_STATUS: status }).subscribe(
      res => {
        this.notificationService.success(`pc ${res["SP_HW_ID"]} sbannato`);
        this.refreshPcsList();
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }
}
