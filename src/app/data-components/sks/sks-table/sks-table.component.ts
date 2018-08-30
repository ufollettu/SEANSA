import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SksApiService } from '../sks-api.service';
import { RinnoviApiService } from '../../rinnovi/rinnovi-api.service';
import { PcApiService } from '../../pc/pc-api.service';
import { MatricoleApiService } from '../../matricole/matricole-api.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

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
  rinnovi: object[];
  pcs: object[];
  serials: any;

  // tslint:disable-next-line:max-line-length
  displayedColumns = ['SS_KEY', 'SS_OEM', 'SS_ACTIVATION_DATE', 'SS_EXPIRE', 'rinnoviCount', 'pcHwId', 'pcLastConnection', 'SS_ACTIVATED_BY', 'SS_ACTIVATION_REFERENT', 'SS_STATUS', 'allowedSerials'];
  // dataSource: any = new SksDataSource(this.api);
  dataSource: any;
  warningDate: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: SksApiService,
    private rinnoviApi: RinnoviApiService,
    private pcApi: PcApiService,
    private matricoleApi: MatricoleApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.warningDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    this.refreshSkssList();
  }

  refreshSkssList() {
    console.log(this.warningDate);
    this.rinnoviApi.getRinnovi()
      .subscribe(rinnovi => {
        const rinnoviCount = rinnovi.map((rinnovo) => {
          return rinnovo['Chiave'];
        }).reduce((allIds, id) => {
          if (id in allIds) {
            allIds[id]++;
          } else {
            allIds[id] = 1;
          }
          return allIds;
        }, {});
        this.rinnovi = rinnoviCount;
      }, (err) => {
        console.log(err);
      });
    this.pcApi.getPcs()
      .subscribe(pcs => {
        const pcsCount = pcs.map((pc) => {
          const pcRes = {};
          pcRes['pcId'] = pc['SP_ID'];
          pcRes['hwId'] = pc['SP_HW_ID'];
          pcRes['lastConnection'] = pc['SP_LAST_RX'];
          return pcRes;
        });
        this.pcs = pcsCount;
      }, (err) => {
        console.log(err);
      });
    this.matricoleApi.getMatricole()
      .subscribe(matricole => {
        const matricoleCount = matricole.map((matricola) => {
          return matricola['SM_SS_ID'];
        }).reduce((allIds, id) => {
          if (id in allIds) {
            allIds[id]++;
          } else {
            allIds[id] = 1;
          }
          return allIds;
        }, {});
        this.serials = matricoleCount;
      });
    this.api.getSkss()
      .subscribe(res => {
        this.sks = res;
        this.dataSource = new MatTableDataSource(this.sks);
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

  decouplePC(id) {
    const status = 1;
    this.api.updateSks(id, { 'SS_SP_ID': "", 'SS_STATUS': status })
      .subscribe(res => {
        alert(`chiave ${res.SS_KEY} disassociata`);
        this.refreshSkssList();
      }, (err) => {
        console.log(err);
      });
  }

  disableSks(id) {
    const status = 0;
    this.api.updateSks(id, { 'SS_STATUS': status })
      .subscribe(res => {
        alert(`chiave ${res.SS_KEY} disabilitata`);
        this.refreshSkssList();
      }, (err) => {
        console.log(err);
      });
  }

  enableSks(id) {
    const status = 1;
    this.api.updateSks(id, { 'SS_STATUS': status })
      .subscribe(res => {
        alert(`chiave ${res.SS_KEY} abilitata`);
        this.refreshSkssList();
      }, (err) => {
        console.log(err);
      });
  }

  deleteSks(id) {
    const conf = confirm(`sei sicuro?`);
    if (conf) {
      const status = -1;
      this.api.updateSks(id, { 'SS_STATUS': status })
        .subscribe(res => {
          alert(`chiave ${res.SS_KEY} eliminata`);
          this.refreshSkssList();
        }, (err) => {
          console.log(err);
        });
    }
  }

  getPcHwId(id) {
    let result = '';
    this.pcs.forEach((pc) => {
      if (pc['pcId'] === id) {
        result = pc['hwId'];
      }
    });
    return result;
  }

  getPcLastConnection(id) {
    let result = '';
    this.pcs.forEach((pc) => {
      if (pc['pcId'] === id) {
        result = pc['lastConnection'];
      }
    });
    return result;
  }

  checkExpDate(expDate) {
    if (expDate <= this.warningDate) {
      return 'red';
    }
    return '';
  }
}

