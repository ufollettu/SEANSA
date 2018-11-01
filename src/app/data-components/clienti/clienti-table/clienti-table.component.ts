import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
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
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

@Component({
  selector: "app-clienti-table",
  templateUrl: "./clienti-table.component.html",
  styleUrls: ["./clienti-table.component.css"],
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
export class ClientiTableComponent implements OnInit, OnDestroy {
  loading;

  // tslint:disable-next-line:max-line-length
  displayedColumns = [
    "SC_NOME",
    "SC_INDIRIZZO",
    "SC_EMAIL",
    "SC_TELEFONO",
    "SC_PIVA",
    "SC_COD_FISCALE",
    "SC_REFERENTE_NOME",
    "SC_TEL_REFERENTE",
    "actions"
  ];
  dataSource: any;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private manager: DataComponentsManagementService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.onRefreshCustomersList();
  }

  onRefreshCustomersList() {
    const refreshList: Subscription = this.manager
      .refreshCustomersList()
      .add(td => {
        this.dataSource = new MatTableDataSource(this.manager.clienti);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.loading = false;
      });
    this.manager.subscriptions.push(refreshList);
  }

  onDeleteCustomer(id: number) {
    const deleteCust: Subscription = this.manager
      .deleteCustomer(id)
      .add(tearDown => {
        this.onRefreshCustomersList();
      });
    this.manager.subscriptions.push(deleteCust);
  }

  ngOnDestroy(): void {
    this.manager.unsubAll();
  }
}
