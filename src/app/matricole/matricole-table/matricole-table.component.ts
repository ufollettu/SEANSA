import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatricoleApiService } from '../matricole-api.service';
import { MatricoleDataSource } from '../matricole-data-source';


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

  displayedColumns = ['SM_MATRICOLA', 'SM_SS_ID', 'SM_DETTAGLI', 'SM_CREATION_DATE'];
  dataSource: any;

  constructor(private api: MatricoleApiService,  private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.refreshMatricoleList();
  }

  refreshMatricoleList() {
    this.api.getMatricole()
      .subscribe(res => {
        console.log(res);
        this.matricole = res;
        this.dataSource = new MatricoleDataSource(this.api);
        this.changeDetectorRefs.detectChanges();
      }, err => {
        console.log(err);
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
