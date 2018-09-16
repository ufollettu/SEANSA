import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PcApiService } from '../pc-api.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-pc-table',
  templateUrl: './pc-table.component.html',
  styleUrls: ['./pc-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PcTableComponent implements OnInit {

  loading;
  pc: any;
  isBanned = false;

  displayedColumns = ['SP_HW_ID', 'SP_IP', 'SP_STATUS', 'SP_LAST_RX'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private api: PcApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) {
    this.loading = true;
   }

  ngOnInit() {
    this.refreshPcsList();
  }

  refreshPcsList() {
    this.api.getPcs()
      .subscribe(res => {
        // console.log(res);
        this.pc = res;
        this.dataSource = new MatTableDataSource(this.pc);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.loading = false;

      }, err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || 500) {
            this.router.navigate(['/login']);
          }
        }
      });
  }

  banPc(id) {
    const status = 1;
    this.api.updatePc(id, { 'SP_STATUS': status })
      .subscribe(res => {
        alert(`pc ${res.SP_HW_ID} bannato`);
        this.refreshPcsList();
      }, (err) => {
        console.log(err);
      });
  }

  unbanPc(id) {
    const status = 0;
    this.api.updatePc(id, { 'SP_STATUS': status })
      .subscribe(res => {
        alert(`pc ${res.SP_HW_ID} sbannato`);
        this.refreshPcsList();
      }, (err) => {
        console.log(err);
      });
  }
}
