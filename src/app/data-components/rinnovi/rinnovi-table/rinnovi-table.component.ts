import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { RinnoviApiService } from "../../../services/api-services/rinnovi-api.service";
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
export class RinnoviTableComponent implements OnInit {
  loading;
  rinnovi: any;

  displayedColumns = ["KeyId", "Chiave", "Timestamp"];
  dataSource: any;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private api: RinnoviApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.refreshRinnoviList();
  }

  refreshRinnoviList() {
    this.api.getRinnovi().subscribe(
      res => {
        if (Object.keys(res).length > 0) {
          this.rinnovi = res;
          this.dataSource = new MatTableDataSource(this.rinnovi);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.changeDetectorRefs.detectChanges();
          this.loading = false;
        }
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || 500) {
            this.router.navigate(["/login"]);
          }
        }
      }
    );
  }
}
