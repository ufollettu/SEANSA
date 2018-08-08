import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SksApiService } from '../sks-api.service';
import { SksDataSource } from '../sks-data-source';

@Component({
  selector: 'app-sks-table',
  templateUrl: './sks-table.component.html',
  styleUrls: ['./sks-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SksTableComponent implements OnInit {
  sks: any;

  displayedColumns = ['SS_KEY', 'SS_OEM', 'SS_ACTIVATION_DATE', 'SS_EXPIRE', 'SS_ACTIVATED_BY', 'SS_ACTIVATION_REFERENT', 'SS_STATUS'];
  dataSource: any;

  constructor(private api: SksApiService, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.refreshSkssList();
  }

  refreshSkssList() {
    this.api.getSkss()
      .subscribe(res => {
        // console.log(res);
        this.sks = res;
        this.dataSource = new SksDataSource(this.api);
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

  deleteSks(id) {
    this.api.deleteSks(id)
      .subscribe(res => {
        alert(`sks ${id} rimossa`);
        this.refreshSkssList();
      }, (err) => {
        console.log(err);
      });
  }

}
