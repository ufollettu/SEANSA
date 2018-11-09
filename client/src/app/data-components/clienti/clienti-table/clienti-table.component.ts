import { AuthService } from "./../../../services/auth-services/auth.service";
import { Router } from "@angular/router";
import { DialogService } from "./../../../services/layout-services/dialog.service";
import { NotificationService } from "./../../../services/layout-services/notification.service";
import { Cliente } from "./../../../models/cliente";
import { ClientiApiService } from "./../../../services/api-services/clienti-api.service";
import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter
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
  clienti: Cliente[];
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

  title: string;

  constructor(
    private authService: AuthService,
    private manager: DataComponentsManagementService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private clientiApi: ClientiApiService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.title = "Clienti";
    this.loading = true;
  }

  ngOnInit() {
    this.onRefreshCustomersList();
  }

  onRefreshCustomersList() {
    const refreshList: Subscription = this.clientiApi
      .getCustomers()
      .subscribe(res => {
        this.clienti = res;
        this.dataSource = new MatTableDataSource(this.clienti);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.loading = false;
        this.manager.noData(res);
      });

    this.manager.subscriptions.push(refreshList);
  }

  onDeleteCustomer(id: number) {
    const deleteCust: Subscription = this.dialogService
      .openConfirmDialog("sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const deleted = 1;
          this.clientiApi.updateCustomer(id, { SC_DELETED: deleted }).subscribe(
            cust => {
              this.notificationService.warn(
                `cliente ${cust["SC_NOME"]} rimosso`
              );
              this.onRefreshCustomersList();
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
    this.manager.subscriptions.push(deleteCust);
  }

  ngOnDestroy(): void {
    this.manager.unsubAll();
  }
}
