import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClientiApiService } from '../clienti-api.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-clienti-table',
  templateUrl: './clienti-table.component.html',
  styleUrls: ['./clienti-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],

})
export class ClientiTableComponent implements OnInit {
  clienti: any;

  displayedColumns = ['SC_NOME', 'SC_INDIRIZZO', 'SC_EMAIL', 'SC_TELEFONO', 'SC_REFERENTE_NOME', 'SC_TEL_REFERENTE'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ClientiApiService, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.refreshCustomersList();
  }

  refreshCustomersList() {
    this.api.getCustomers()
      .subscribe(res => {
        // console.log(res);
        this.clienti = res;
        this.dataSource = new MatTableDataSource(this.clienti);
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

  deleteCustomer(id) {
    const conf = confirm(`sei sicuro?`);
    if (conf) {
      const deleted = 1;
      this.api.updateCustomer(id, { 'SC_DELETED': deleted })
        .subscribe(res => {
          // console.log(res);
          // const id = res['SC_ID'];
          alert(`cliente ${res['SC_NOME']} rimosso`);
          this.refreshCustomersList();
        }, (err) => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || 500) {
              this.router.navigate(['/login']);
            }
          }
        });
    }
  }

}
