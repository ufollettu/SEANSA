import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClientiDataSource } from '../clienti-data-source';
import { ClientiApiService } from '../clienti-api.service';

@Component({
  selector: 'app-clienti-table',
  templateUrl: './clienti-table.component.html',
  styleUrls: ['./clienti-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientiTableComponent implements OnInit {
  clienti: any;

  displayedColumns = ['SC_NOME', 'SC_INDIRIZZO', 'SC_EMAIL', 'SC_TELEFONO', 'SC_REFERENTE_NOME', 'SC_TEL_REFERENTE'];
  dataSource: any;

  constructor(private api: ClientiApiService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.refreshCustomersList();
  }

  refreshCustomersList() {
    this.api.getCustomers()
      .subscribe(res => {
        console.log(res);
        this.clienti = res;
        this.dataSource = new ClientiDataSource(this.api);
        this.changeDetectorRefs.detectChanges();
      }, err => {
        console.log(err);
      });
  }

  deleteCustomer(id) {
    this.api.deleteCustomer(id)
      .subscribe(res => {
        alert(`cliente ${id} rimosso`);
        this.refreshCustomersList();
      }, (err) => {
        console.log(err);
      });
  }

}
