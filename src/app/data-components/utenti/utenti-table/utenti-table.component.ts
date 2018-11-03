import { DialogService } from "./../../../services/layout-services/dialog.service";
import { NotificationService } from "./../../../services/layout-services/notification.service";
import { Utente } from "./../../../models/utente";
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
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";
import { AuthService } from "../../../services/auth-services/auth.service";
import { Subscription } from "rxjs";
import { UtentiApiService } from "src/app/services/api-services/utenti-api.service";

@Component({
  selector: "app-utenti-table",
  templateUrl: "./utenti-table.component.html",
  styleUrls: ["./utenti-table.component.css"],
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
export class UtentiTableComponent implements OnInit, OnDestroy {
  loading;
  utenti: Utente[];
  currentUsername;

  displayedColumns = [
    "SU_UNA",
    "SU_LAST_IP",
    "SU_LAST_LOGIN",
    "SU_CREATION",
    "SU_LAST_EDIT",
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
    private authService: AuthService,
    private manager: DataComponentsManagementService,
    private utentiApi: UtentiApiService,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {
    this.title = "Utenti";
    this.loading = true;
  }

  ngOnInit() {
    this.getUsername();
    this.refreshUsersList();
  }

  getUsername() {
    this.currentUsername = this.authService.getUsername();
  }

  refreshUsersList() {
    const listUsers: Subscription = this.utentiApi.getUtenti().subscribe(
      res => {
        this.utenti = res;
        this.dataSource = new MatTableDataSource(this.utenti);
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
    this.manager.subscriptions.push(listUsers);
  }

  deleteUser(id: number) {
    const delUser: Subscription = this.dialogService
      .openConfirmDialog("sei Sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const deleted = 1;
          this.utentiApi.updateUtente(id, { SU_DELETED: deleted }).subscribe(
            user => {
              this.notificationService.warn(`utente ${user["SU_UNA"]} rimosso`);
              this.refreshUsersList();
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
    this.manager.subscriptions.push(delUser);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
