import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { Sks } from "./../../../models/sks";
import { DataService } from "../../../services/shared-services/data.service";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  MatSort,
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import * as moment from "moment";

import { oems } from "../sks-oem-data";
import { Cliente } from "../../../models/cliente";
import { SksDetailsComponent } from "../sks-details/sks-details.component";

@Component({
  selector: "app-sks-table",
  templateUrl: "./sks-table.component.html",
  styleUrls: ["./sks-table.component.css"],
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
export class SksTableComponent implements OnInit {
  loading;
  oems;

  sks: Sks[];
  rinnoviObj: object = {};
  pcsObjArr: object[] = [];
  clienti: Cliente[] = [];
  serials: object = {};
  packUsedCount;
  userId;

  sksPcHwId;
  // tslint:disable-next-line:max-line-length
  displayedColumns = [
    "SS_KEY",
    "SS_SC_ID",
    "SS_OEM",
    "SS_CREATED",
    "SS_ACTIVATION_DATE",
    "SS_EXPIRE",
    "SS_STATUS",
    "rinnoviCount",
    "allowedSerials",
    "actions"
  ];

  dataSource: any;
  warningDate: any;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private data: DataService,
    private manager: DataComponentsManagementService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.oems = oems;
    this.warningDate = moment().format("YYYY-MM-DD");
    this.getUtente();
    this.refreshSkssList();
  }

  async refreshSkssList() {
    await this.fetchRinnovi();
    await this.fetchClienti();
    await this.fetchPcs();
    await this.fetchMatricole();
    this.manager.refreshSkssList().add(td => {
      this.sks = this.manager.sks;
      this.dataSource = new MatTableDataSource(this.manager.sks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
      this.loading = false;
    });
  }

  decouplePC(id) {
    this.manager.decouplePC(id).add(td => {
      this.refreshSkssList();
    });
  }

  disableSks(id) {
    this.manager.disableSks(id).add(td => {
      this.refreshSkssList();
    });
  }

  enableSks(id) {
    this.manager.enableSks(id).add(td => {
      this.refreshSkssList();
    });
  }

  deleteSks(id) {
    this.manager.deleteSks(id).add(td => {
      this.refreshSkssList();
    });
  }

  checkExpDate(expDate) {
    if (expDate <= this.warningDate) {
      return "red";
    }
    return "";
  }

  fetchClienti() {
    this.manager.refreshCustomersList().add(td => {
      this.clienti = this.manager.clienti;
    });
  }

  fetchRinnovi() {
    this.manager.fetchRinnovi().add(td => {
      this.rinnoviObj = this.manager.rinnoviObj;
    });
  }

  fetchPcs() {
    this.manager.refershPcList().add(td => {
      this.pcsObjArr = this.manager.pcsObjArr;
    });
  }

  fetchMatricole() {
    this.manager.fetchMatricole().add(td => {
      this.serials = this.manager.serials;
    });
  }

  showDetails(sksId, pcHwId, customerName, oem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      sksId: sksId,
      pcHwId: pcHwId,
      oem: oem,
      customerName: customerName
    };
    this.dialog.open(SksDetailsComponent, dialogConfig);
  }

  getUtente() {
    this.data.getUserFromToken().subscribe(utente => {
      this.userId = utente["SU_ID"];
    });
  }

  onMatricoleLink(url, id) {
    this.data.changeUrl(url);
    this.router.navigate([url, id]);
  }
}
