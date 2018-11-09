import { AuthService } from "./../../../services/auth-services/auth.service";
import { RinnoviApiService } from "./../../../services/api-services/rinnovi-api.service";
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
import { Rinnovo } from "src/app/models/rinnovo";

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
  rinnovi: Rinnovo[];

  displayedColumns = ["KeyId", "Chiave", "Timestamp"];
  dataSource: any;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  title: string;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private manager: DataComponentsManagementService,
    private rinnoviApi: RinnoviApiService,
    private authService: AuthService
  ) {
    this.title = "Rinnovi";
    this.loading = true;
  }

  ngOnInit() {
    this.refreshRinnoviList();
  }

  refreshRinnoviList() {
    const rinnoviList: Subscription = this.rinnoviApi.getRinnovi().subscribe(
      res => {
        this.rinnovi = res;
        this.dataSource = new MatTableDataSource(this.rinnovi);
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
    this.manager.subscriptions.push(rinnoviList);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
