import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtentiApiService } from '../utenti-api.service';
import { fadeInAnimation, fadeAnimation } from '../../../animations';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-utenti-table',
  templateUrl: './utenti-table.component.html',
  styleUrls: ['./utenti-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UtentiTableComponent implements OnInit {

  loading;
  utenti: any;

  displayedColumns = ['SU_UNA', 'SU_LAST_IP', 'SU_LAST_LOGIN'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private api: UtentiApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router) {
      this.loading = true;
    }

  ngOnInit() {
    this.refreshUsersList();
  }

  refreshUsersList() {
    this.api.getUtenti()
      .subscribe(res => {
        // console.log(res);
        this.utenti = res;
        this.dataSource = new MatTableDataSource(this.utenti);
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

  deleteUser(id) {
    const conf = confirm(`sei sicuro?`);
    if (conf) {
      const deleted = 1;
      this.api.updateUtente(id, { 'SU_DELETED': deleted })
        .subscribe(res => {
          // console.log(res);
          // const id = res['SC_ID'];
          alert(`utente ${res['SU_UNA']} rimosso`);
          this.refreshUsersList();
        }, (err) => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || 500) {
              this.router.navigate(['/login']);
            }
          }
        });
    }


    // this.api.deleteUtente(id)
    //   .subscribe(res => {
    //     alert(`utente ${id} rimosso`);
    //     this.refreshUsersList();
    //   }, (err) => {
    //     console.log(err);
    //   });
  }
}
