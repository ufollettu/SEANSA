import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatricoleApiService } from '../matricole-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-matricole-table',
  templateUrl: './matricole-table.component.html',
  styleUrls: ['./matricole-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MatricoleTableComponent implements OnInit {

  matricole: any;
  sksId: any;

  displayedColumns = ['SM_MATRICOLA', 'SM_DETTAGLI', 'SM_CREATION_DATE'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: MatricoleApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sksId = this.route.snapshot.params['sksId'];
    this.refreshMatricoleList();
  }

  refreshMatricoleList() {
    this.api.getMatricoleBySks(this.sksId)
      .subscribe(res => {
        console.log(res);
        this.matricole = res;
        this.dataSource = new MatTableDataSource(this.matricole);
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
      }, err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || 500) {
            this.router.navigate(['/login']);
          }
        }
      });
  }

  deleteMatricola(id) {
    this.api.deleteMatricola(id)
      .subscribe(res => {
        alert(`matricola ${id} rimossa`);
        this.refreshMatricoleList();
      }, (err) => {
        console.log(err);
      });
  }

}
