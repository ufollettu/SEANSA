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
    private changeDetectorRefs: ChangeDetectorRef,
    private manager: DataComponentsManagementService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.refreshPcsList();
  }

  refreshPcsList() {
    const pcList: Subscription = this.manager.refershPcList().add(td => {
      this.dataSource = new MatTableDataSource(this.manager.pcs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
      this.loading = false;
    });
    this.manager.subscriptions.push(pcList);
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
