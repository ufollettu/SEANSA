import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtentiApiService } from '../../../services/api-services/utenti-api.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DialogService } from '../../../services/layout-services/dialog.service';
import { NotificationService } from '../../../services/layout-services/notification.service';
import { Utente } from '../../../models/utente';
import { AuthService } from '../../../services/auth-services/auth.service';

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
  utenti: Utente[];

  displayedColumns = ['SU_UNA', 'SU_LAST_IP', 'SU_LAST_LOGIN', 'SU_CREATION', 'SU_LAST_EDIT', 'actions'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private api: UtentiApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {
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
        this.authService.handleLoginError(err);
      });
  }

  deleteUser(id: number) {
    this.dialogService.openConfirmDialog('sei Sicuro?')
      .afterClosed().subscribe(res => {
        if (res) {
          const deleted = 1;
          this.api.updateUtente(id, { 'SU_DELETED': deleted })
            .subscribe(user => {
              this.notificationService.warn(`utente ${user['SU_UNA']} rimosso`);
              this.refreshUsersList();
            }, (err) => {
              this.authService.handleLoginError(err);
            });
        }
      });
  }
}
