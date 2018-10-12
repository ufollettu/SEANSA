import { Pc } from "./../../../models/pc";
import { Rinnovo } from "./../../../models/rinnovo";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
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
import { SksApiService } from "../../../services/api-services/sks-api.service";
import { RinnoviApiService } from "../../../services/api-services/rinnovi-api.service";
import { PcApiService } from "../../../services/api-services/pc-api.service";
import { MatricoleApiService } from "../../../services/api-services/matricole-api.service";
import { ClientiApiService } from "../../../services/api-services/clienti-api.service";
import { DialogService } from "../../../services/layout-services/dialog.service";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { Cliente } from "../../../models/cliente";
import { Sks } from "../../../models/sks";
import { Matricola } from "../../../models/matricola";

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
  oems = oems;

  sks: Sks[];
  rinnovi: object = {};
  pcs: object[] = [];
  clienti: Cliente[] = [];
  serials: object = {};

  // tslint:disable-next-line:max-line-length
  displayedColumns = [
    "SS_KEY",
    "SS_ID",
    "SS_SC_ID",
    "SS_OEM",
    "SS_SP_ID",
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
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private api: SksApiService,
    private rinnoviApi: RinnoviApiService,
    private pcApi: PcApiService,
    private clientiApi: ClientiApiService,
    private matricoleApi: MatricoleApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.warningDate = moment().format("YYYY-MM-DD");
    this.refreshSkssList();
  }

  refreshSkssList() {
    this.api.getSkss().subscribe(
      res => {
        this.sks = res;
        this.dataSource = new MatTableDataSource(this.sks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.loading = false;
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || 500) {
            this.router.navigate(["/login"]);
          }
        }
      }
    );
    this.fetchRinnovi();
    this.fetchPcs();
    this.fetchMatricole();
    this.fetchClienti();
  }

  decouplePC(id) {
    const status = 1;
    this.api.getSks(id).subscribe(
      key => {
        if (key["SS_SP_ID"] === 0) {
          this.notificationService.warn(
            `non ci sono pc associati a questa chiave`
          );
        } else {
          this.api
            .updateSks(id, { SS_SP_ID: "", SS_STATUS: status })
            .subscribe(res => {
              this.notificationService.success(
                `chiave ${res["SS_KEY"]} disassociata`
              );
              this.refreshSkssList();
            });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  disableSks(id) {
    const status = 0;
    this.api.updateSks(id, { SS_STATUS: status }).subscribe(
      res => {
        this.notificationService.warn(`chiave ${res["SS_KEY"]} disabilitata`);
        this.refreshSkssList();
      },
      err => {
        console.log(err);
      }
    );
  }

  enableSks(id) {
    const status = 1;
    this.api.updateSks(id, { SS_STATUS: status }).subscribe(
      res => {
        this.notificationService.success(`chiave ${res["SS_KEY"]} abilitata`);
        this.refreshSkssList();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteSks(id) {
    this.dialogService
      .openConfirmDialog(`sei sicuro?`)
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const status = -1;
          this.api.updateSks(id, { SS_STATUS: status }).subscribe(
            key => {
              this.notificationService.warn(
                `chiave ${key["SS_KEY"]} eliminata`
              );
              this.refreshSkssList();
            },
            err => {
              console.log(err);
            }
          );
        }
      });
  }

  getPcHwId(id) {
    let result = "";
    this.pcs.forEach(pc => {
      if (pc["pcId"] === id) {
        result = pc["hwId"];
      }
    });
    return result;
  }

  getCustomerName(id) {
    let result = "";
    this.clienti.forEach(cliente => {
      if (cliente["SC_ID"] === id) {
        result = cliente["SC_NOME"];
      }
    });
    return result;
  }

  getPcLastConnection(id) {
    let result = "";
    this.pcs.forEach(pc => {
      if (pc["pcId"] === id) {
        result = pc["lastConnection"];
      }
    });
    return result;
  }

  checkExpDate(expDate) {
    if (expDate <= this.warningDate) {
      return "red";
    }
    return "";
  }

  fetchOemsValue(keyOem) {
    let oemName = "";
    this.oems.forEach(oem => {
      if (keyOem === oem.value) {
        oemName = oem.name;
      }
    });
    return oemName;
  }

  fetchClienti() {
    this.clientiApi.getCustomers().subscribe(
      clienti => {
        this.clienti = clienti;
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchRinnovi() {
    this.rinnoviApi.getRinnovi().subscribe(
      rinnovi => {
        if (Object.keys(rinnovi).length > 0) {
          const rinnoviCount = rinnovi
            .map(rinnovo => {
              return rinnovo["Chiave"];
            })
            .reduce((allIds, id) => {
              if (id in allIds) {
                allIds[id]++;
              } else {
                allIds[id] = 1;
              }
              return allIds;
            }, {});
          this.rinnovi = rinnoviCount;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchPcs() {
    this.pcApi.getPcs().subscribe(
      pcs => {
        const pcsCount = pcs.map(pc => {
          const pcRes = {};
          pcRes["pcId"] = pc["SP_ID"];
          pcRes["hwId"] = pc["SP_HW_ID"];
          pcRes["lastConnection"] = pc["SP_LAST_RX"];
          return pcRes;
        });
        this.pcs = pcsCount;
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchMatricole() {
    this.matricoleApi.getMatricole().subscribe(matricole => {
      const matricoleCount = matricole
        .map(matricola => {
          return matricola["SM_SS_ID"];
        })
        .reduce((allIds, id) => {
          if (id in allIds) {
            allIds[id]++;
          } else {
            allIds[id] = 1;
          }
          return allIds;
        }, {});
      this.serials = matricoleCount;
    });
  }
}
