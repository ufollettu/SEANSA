import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClientiDataSource } from '../clienti-data-source';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  cliente = {};
  // id = this.route.snapshot.params['id'];

  displayedColumns = ['SC_NOME', 'SC_INDIRIZZO', 'SC_EMAIL', 'SC_TELEFONO', 'SC_REFERENTE_NOME', 'SC_TEL_REFERENTE'];
  dataSource = new ClientiDataSource(this.api);

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getCustomers()
      .subscribe(res => {
        console.log(res);
        this.clienti = res;
      }, err => {
        console.log(err);
      });
  }

  getCustomerDetails(id) {
    this.api.getCustomer(id)
      .subscribe(data => {
        console.log(data);
        this.cliente = data;
      });
  }

  refreshCustomersList() {
    this.api.getCustomers()
      .subscribe(res => {
        console.log(res);
        this.clienti = res;
      }, err => {
        console.log(err);
      });
  }

  deleteCustomer(id) {
    this.api.deleteCustomer(id)
      .subscribe(res => {
        alert(`cliente ${id} rimosso`);
        // TODO fix reload list after delete
        const index = this.clienti.indexOf(id, 0);
        if (index > -1) {
            this.clienti.splice(index, 1);
            this.refreshCustomersList();
        }
      }, (err) => {
        console.log(err);
      }
      );
  }

}
