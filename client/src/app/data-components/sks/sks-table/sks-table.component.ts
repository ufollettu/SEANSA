import { Subscription } from "rxjs";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
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

import { Sks } from "./../../../models/sks";
import { Cliente } from "../../../models/cliente";
import { Pc } from "src/app/models/pc";
import { SksDetailsComponent } from "../sks-details/sks-details.component";

import { SksApiService } from "./../../../services/api-services/sks-api.service";
import { RinnoviApiService } from "src/app/services/api-services/rinnovi-api.service";
import { ClientiApiService } from "src/app/services/api-services/clienti-api.service";
import { PcApiService } from "src/app/services/api-services/pc-api.service";
import { MatricoleApiService } from "src/app/services/api-services/matricole-api.service";

import { AuthService } from "./../../../services/auth-services/auth.service";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { DataService } from "../../../services/shared-services/data.service";

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
export class SksTableComponent implements OnInit, OnDestroy {
  loading;
  oems;

  pcs: Pc[];
  sks: Sks[];
  rinnoviObj: object = {};
  pcsObjArr: object[] = [];
  clienti: Cliente[] = [];
  clientiMap: {}[] = [];
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

  title: string;

  constructor(
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private data: DataService,
    private manager: DataComponentsManagementService,
    private sksApi: SksApiService,
    private rinnoviApi: RinnoviApiService,
    private clientiApi: ClientiApiService,
    private pcsApi: PcApiService,
    private matricoleApi: MatricoleApiService,
    private authService: AuthService
  ) {
    this.title = "Sks";
    this.loading = true;
    this.fetchRinnovi();
    this.fetchClienti();
    this.fetchPcs();
    this.fetchMatricole();
  }

  ngOnInit() {
    this.oems = this.manager.oems;
    this.warningDate = moment().format("YYYY-MM-DD");
    this.getUtente();
    this.refreshSkssList();
  }

  async refreshSkssList() {
    const sksList: Subscription = this.sksApi.getSkss().subscribe(
      res => {
        this.sks = res;
        this.mapSks(this.sks);
        this.dataSource = new MatTableDataSource(this.sks);
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
    this.manager.subscriptions.push(sksList);
  }

  mapSks(sks: Sks[]) {
    sks.map(sk => {
      sk["sksPcHwId"] = this.getPcHwId(sk["SS_SP_ID"]);
      sk["sksPcLastConnection"] = this.getPcLastConnection(
        sk["SS_SP_ID"]
      );
      sk["sksCustomerName"] = this.getCustomerName(sk["SS_SC_ID"]);
      sk["sksOems"] = this.manager.fetchOemsValue(sk["SS_OEM"]);
      sk["sksStatus"] = sk["SS_STATUS"] ? "abilitata" : "disabilitata";

      return sk;
    });
  }

  getPcHwId(id) {
    let result = "";
    this.pcs.forEach(pc => {
      if (pc["SP_ID"] === id) {
        result = pc["SP_HW_ID"];
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
    let result;
    this.pcs.forEach(pc => {
      if (pc["SP_ID"] === id) {
        result = pc["SP_LAST_RX"];
      }
    });
    return result;
  }

  decouplePC(id) {
    const decPc: Subscription = this.manager.decouplePC(id).add(td => {
      this.refreshSkssList();
    });
    this.manager.subscriptions.push(decPc);
  }

  disableSks(id) {
    const disSks: Subscription = this.manager.disableSks(id).add(td => {
      this.refreshSkssList();
    });
    this.manager.subscriptions.push(disSks);
  }

  enableSks(id) {
    const enaSks: Subscription = this.manager.enableSks(id).add(td => {
      this.refreshSkssList();
    });
    this.manager.subscriptions.push(enaSks);
  }

  deleteSks(id) {
    const delSks: Subscription = this.manager.deleteSks(id).add(td => {
      this.refreshSkssList();
    });
    this.manager.subscriptions.push(delSks);
  }

  checkExpDate(expDate) {
    if (expDate <= this.warningDate) {
      return "red";
    }
    return "";
  }

  fetchClienti() {
    const fetchCust: Subscription = this.clientiApi.getCustomers().subscribe(clienti => {
      this.clienti = clienti;
      const clientiMap = clienti.map(cliente => {
        const resClienti = {};
        resClienti["value"] = cliente["SC_ID"];
        resClienti["name"] = cliente["SC_NOME"];
        return resClienti;
      });
      this.clientiMap = clientiMap;
    });
    this.manager.subscriptions.push(fetchCust);
  }

  fetchRinnovi() {
    const fetchRinnovi: Subscription = this.rinnoviApi.getRinnovi().subscribe(
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
          this.rinnoviObj = rinnoviCount;
        }
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
    this.manager.subscriptions.push(fetchRinnovi);
  }

  fetchPcs() {
    const fetchPcs: Subscription = this.pcsApi.getPcs().subscribe(
      pcs => {
        this.pcs = pcs;
        const pcsCount = pcs.map(pc => {
          const pcRes = {};
          pcRes["pcId"] = pc["SP_ID"];
          pcRes["hwId"] = pc["SP_HW_ID"];
          pcRes["lastConnection"] = pc["SP_LAST_RX"];
          return pcRes;
        });
        this.pcsObjArr = pcsCount;
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
    this.manager.subscriptions.push(fetchPcs);
  }

  fetchMatricole() {
    const fetchMatr: Subscription = this.matricoleApi.getMatricole().subscribe(matricole => {
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
    this.manager.subscriptions.push(fetchMatr);
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
    const getUser: Subscription = this.data
      .getUserFromToken()
      .subscribe(utente => {
        this.userId = utente["SU_ID"];
      });
    this.manager.subscriptions.push(getUser);
  }

  onMatricoleLink(url, id) {
    this.data.changeUrl(url);
    this.router.navigate([url, id]);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
