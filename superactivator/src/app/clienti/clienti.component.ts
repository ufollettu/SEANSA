import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { ClientiDataSource } from '../clienti-data-source';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit {
  clienti: any;
  // displayedColumns = [
  //   'SC_NOME', 'SC_PIVA', 'SC_COD_FISCALE', 'SC_INDIRIZZO', 'SC_EMAIL', 'SC_TELEFONO', 'SC_REFERENTE_NOME', 'SC_TEL_REFERENTE', 'SC_TS'
  // ];
  displayedColumns = ['SC_NOME', 'SC_INDIRIZZO', 'SC_EMAIL', 'SC_TELEFONO', 'SC_REFERENTE_NOME', 'SC_TEL_REFERENTE'];
  dataSource = new ClientiDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCustomers()
      .subscribe(res => {
        console.log(res);
        this.clienti = res;
      }, err => {
        console.log(err);
      });
  }

}
