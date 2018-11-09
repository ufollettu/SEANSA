import { NotificationService } from "./../../../services/layout-services/notification.service";
import { DialogService } from "./../../../services/layout-services/dialog.service";
import { AuthService } from "./../../../services/auth-services/auth.service";
import { Matricola } from "./../../../models/matricola";
import { MatricoleApiService } from "./../../../services/api-services/matricole-api.service";
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
import { ActivatedRoute } from "@angular/router";
import { MatSort, MatTableDataSource } from "@angular/material";
import { Subscription } from "rxjs";

@Component({
  selector: "app-matricole-table",
  templateUrl: "./matricole-table.component.html",
  styleUrls: ["./matricole-table.component.css"],
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
export class MatricoleTableComponent implements OnInit, OnDestroy {
  loading;
  sksId: any;
  matricole: Matricola[];

  displayedColumns = [
    "SM_MATRICOLA",
    "SM_SS_ID",
    "SM_DETTAGLI",
    "SM_CREATION_DATE",
    "SM_LAST_UPDATE",
    "actions"
  ];
  dataSource: any;

  @ViewChild(MatSort)
  sort: MatSort;

  title: string;

  constructor(
    private authService: AuthService,
    private matricoleApi: MatricoleApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private route: ActivatedRoute,
    private manager: DataComponentsManagementService,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {
    this.title = "Matricole";
    this.loading = true;
  }

  ngOnInit() {
    this.sksId = this.route.snapshot.params["sksId"];
    this.refreshMatricoleList();
  }

  refreshMatricoleList() {
    const getMatr: Subscription = this.matricoleApi
      .getMatricoleBySks(this.sksId)
      .subscribe(
        res => {
          this.matricole = res;
          this.dataSource = new MatTableDataSource(this.matricole);
          this.dataSource.sort = this.sort;
          this.changeDetectorRefs.detectChanges();
          this.loading = false;
          this.manager.noData(res);
        },
        err => {
          this.authService.handleLoginError(err);
        }
      );
    this.manager.subscriptions.push(getMatr);
  }

  onDeleteMatricola(id) {
    const deleteMatr: Subscription = this.dialogService
      .openConfirmDialog("Sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.matricoleApi.deleteMatricola(id).subscribe(
            matr => {
              this.notificationService.warn(`Matricola ${id} rimossa`);
              this.refreshMatricoleList();
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
    this.manager.subscriptions.push(deleteMatr);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
