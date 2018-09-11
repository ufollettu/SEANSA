import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SksApiService } from '../sks-api.service';
import { RinnoviApiService } from '../../rinnovi/rinnovi-api.service';
import { PcApiService } from '../../pc/pc-api.service';
import { MatricoleApiService } from '../../matricole/matricole-api.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
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
  oems = [
    { value: 0, name: 'ATUM FULL', description: 'versione completa con tutti gli aggiornamenti e rinnovo licenza via web' },
    // tslint:disable-next-line:max-line-length
    { value: 1, name: 'ATUM OEM', description: 'versione con blocco scheda e limitazione degli aggiornamenti da web (no documenti - bollettini e firmware) con rinnovo licenze via web' },
    // tslint:disable-next-line:max-line-length
    { value: 2, name: 'ATUM OEM-D', description: 'versione senza blocco scheda ma con limitazione aggiornamenti da web (no documenti - bollettini e firmware) con rinnovo licenze via web' },
    // tslint:disable-next-line:max-line-length
    { value: 3, name: 'ATUM NO-TRAD', description: 'versione senza blocco scheda ma senza aggiornamenti da web (solo teamviewer e SW update) con rinnovo licenze via web' },
    // tslint:disable-next-line:max-line-length
    { value: 10, name: 'LECU FULL', description: 'versione completa LECU' },
    // tslint:disable-next-line:max-line-length
    { value: 11, name: 'LECU DEMO', description: 'versione demo senza connessione alle centraline' },
    // tslint:disable-next-line:max-line-length
    { value: 12, name: 'LECU OEM', description: 'versione con blocco scheda in base alle matricole associate' },
  ];

  sks: any;
  rinnovi: object[] = [];
  pcs: object[] = [];
  serials: any = [];

  // tslint:disable-next-line:max-line-length
  displayedColumns = ['SS_KEY', 'SS_OEM', 'pcHwId', 'SS_CREATED', 'SS_ACTIVATION_DATE', 'SS_EXPIRE', 'pcLastConnection', 'SS_STATUS', 'rinnoviCount', 'allowedSerials'];

  dataSource: any;
  warningDate: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private api: SksApiService,
    private rinnoviApi: RinnoviApiService,
    private pcApi: PcApiService,
    private matricoleApi: MatricoleApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.warningDate = moment().format('YYYY-MM-DD');
    // this.fetchRinnovi();
    // this.fetchPcs();
    // this.fetchMatricole();
    this.refreshSkssList();
  }

  refreshSkssList() {
    this.api.getSkss()
      .subscribe(res => {
        this.sks = res;
        this.dataSource = new MatTableDataSource(this.sks);
        this.dataSource.paginator = this.paginator;
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
      this.fetchRinnovi();
      this.fetchPcs();
      this.fetchMatricole();
  }

  decouplePC(id) {
    const status = 1;
    this.api.updateSks(id, { 'SS_SP_ID': "", 'SS_STATUS': status })
      .subscribe(res => {
        if (!res) {
          alert('non ci sono pc associati a questa chiave');
        } else {
          alert(`chiave ${res.SS_KEY} disassociata`);
          this.refreshSkssList();
        }
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

  fetchOemsValue(keyOem) {
    let oemName = '';
    this.oems.forEach(oem => {
      if (keyOem === oem.value) {
        oemName = oem.name;
      }
    });
    return oemName;
  }

  fetchRinnovi() {
    this.rinnoviApi.getRinnovi()
      .subscribe(rinnovi => {
        // console.log(rinnovi);
        if (Object.keys(rinnovi).length > 0) {
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
        }
      }, (err) => {
        console.log(err);
      });
  }

  fetchPcs() {
    this.pcApi.getPcs()
      .subscribe(pcs => {
        // console.log(pcs);

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
  }
  fetchMatricole() {
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
  }
}

