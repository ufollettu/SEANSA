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
  selector: "app-rinnovi-table",
  templateUrl: "./rinnovi-table.component.html",
  styleUrls: ["./rinnovi-table.component.css"],
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
export class RinnoviTableComponent implements OnInit, OnDestroy {
  loading;

  displayedColumns = ["KeyId", "Chiave", "Timestamp"];
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
    this.refreshRinnoviList();
  }

  refreshRinnoviList() {
    const rinnoviList: Subscription = this.manager
      .refreshRinnoviList()
      .add(td => {
        this.dataSource = new MatTableDataSource(this.manager.rinnovi);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.loading = false;
      });
    this.manager.subscriptions.push(rinnoviList);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
