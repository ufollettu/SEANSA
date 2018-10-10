import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtentiApiService } from '../utenti-api.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DialogService } from '../../../services/dialog.service';
import { NotificationService } from '../../../services/notification.service';

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
    private notificationService: NotificationService,
    private dialogService: DialogService,
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
    this.dialogService.openConfirmDialog('sei Sicuro?')
      .afterClosed().subscribe(res => {
        if (res) {
          const deleted = 1;
          this.api.updateUtente(id, { 'SU_DELETED': deleted })
            .subscribe(user => {
              this.notificationService.warn(`utente ${user['SU_UNA']} rimosso`);
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
      });
  }
}
