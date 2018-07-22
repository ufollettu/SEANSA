import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RinnoviApiService } from '../rinnovi-api.service';
import { RinnoviDataSource } from '../rinnovi-data-source';


@Component({
  selector: 'app-rinnovi-table',
  templateUrl: './rinnovi-table.component.html',
  styleUrls: ['./rinnovi-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RinnoviTableComponent implements OnInit {

  rinnovi: any;

  displayedColumns = ['SR_SS_ID', 'SR_TS'];
  dataSource: any;

  constructor(private api: RinnoviApiService, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.refreshRinnoviList();
  }

  refreshRinnoviList() {
    this.api.getRinnovi()
      .subscribe(res => {
        console.log(res);
        this.rinnovi = res;
        this.dataSource = new RinnoviDataSource(this.api);
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

  deleteRinnovo(id) {
    this.api.deleteRinnovo(id)
      .subscribe(res => {
        alert(`rinnovo ${id} rimosso`);
        this.refreshRinnoviList();
      }, (err) => {
        console.log(err);
      });
  }
}
