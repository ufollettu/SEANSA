import { Pc } from "./../../../models/pc";
import { AuthService } from "./../../../services/auth-services/auth.service";
import { PcApiService } from "./../../../services/api-services/pc-api.service";
import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

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
export class PcTableComponent implements OnInit, OnDestroy {
  loading;
  isBanned = false;
  pcs: Pc[];

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

  title: string;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private manager: DataComponentsManagementService,
    private pcsApi: PcApiService,
    private authService: AuthService
  ) {
    this.title = "Pc";
    this.loading = true;
  }

  ngOnInit() {
    this.refreshPcsList();
  }

  refreshPcsList() {
    const pcList: Subscription = this.pcsApi.getPcs().subscribe(
      res => {
        this.mapPcs(res);
        this.pcs = res;
        this.dataSource = new MatTableDataSource(this.pcs);
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
    this.manager.subscriptions.push(pcList);
  }

  mapPcs(pcs: Pc[]) {
    pcs.map(pc => {
      pc["statusDescription"] = pc["SP_STATUS"] ? "bannato" : "non bannato";
      return pc;
    });
  }

  banPc(id: number) {
    const banPc: Subscription = this.manager.banPc(id).add(td => {
      this.refreshPcsList();
    });
    this.manager.subscriptions.push(banPc);
  }

  unbanPc(id: number) {
    const unbanPc: Subscription = this.manager.unbanPc(id).add(td => {
      this.refreshPcsList();
    });
    this.manager.subscriptions.push(unbanPc);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
