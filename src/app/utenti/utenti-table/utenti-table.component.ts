import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtentiDataSource } from '../utenti-data-source';
import { UtentiApiService } from '../utenti-api.service';

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

  utenti: any;

  displayedColumns = ['SU_UNA', 'SU_LEVEL', 'SU_LAST_IP', 'SU_LAST_LOGIN'];
  dataSource: any;

  constructor(private api: UtentiApiService, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.refreshUsersList();
  }

  refreshUsersList() {
    this.api.getUtenti()
      .subscribe(res => {
        console.log(res);
        this.utenti = res;
        this.dataSource = new UtentiDataSource(this.api);
        this.changeDetectorRefs.detectChanges();
      }, err => {
        console.log(err);
        if (err instanceof HttpErrorResponse ) {
          if (err.status === 401 || 500) {
            this.router.navigate(['/login']);
          }
        }
      });
  }

  deleteUser(id) {
    const deleted = 1;
    this.api.updateUtente(id, {'SU_DELETED': deleted})
      .subscribe(res => {
        console.log(res);
        // const id = res['SC_ID'];
        confirm(`vuoi davvero eliminare l'utente ${res['SU_UNA']} `);
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

    // this.api.deleteUtente(id)
    //   .subscribe(res => {
    //     alert(`utente ${id} rimosso`);
    //     this.refreshUsersList();
    //   }, (err) => {
    //     console.log(err);
    //   });
  }
}
