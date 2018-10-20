import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ClientiApiService } from "../../../services/api-services/clienti-api.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { DialogService } from "../../../services/layout-services/dialog.service";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { Cliente } from "../../../models/cliente";
import { AuthService } from "../../../services/auth-services/auth.service";

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
export class ClientiTableComponent implements OnInit {
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

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private api: ClientiApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.refreshCustomersList();
  }

  refreshCustomersList() {
    this.api.getCustomers().subscribe(
      res => {
        this.clienti = res;
        this.dataSource = new MatTableDataSource(this.clienti);
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

  noData(data: Cliente[]) {
    if (data.length === 0) {
      this.notificationService.noData();
    }
  }

  deleteCustomer(id: number) {
    this.dialogService
      .openConfirmDialog("sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const deleted = 1;
          this.api.updateCustomer(id, { SC_DELETED: deleted }).subscribe(
            cust => {
              this.notificationService.warn(
                `cliente ${cust["SC_NOME"]} rimosso`
              );
              this.refreshCustomersList();
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
  }
}
