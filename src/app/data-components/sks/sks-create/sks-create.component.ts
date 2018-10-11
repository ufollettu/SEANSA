import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations';
import { oems } from '../sks-oem-data';
import { SksApiService } from '../../../services/api-services/sks-api.service';
import { ClientiApiService } from '../../../services/api-services/clienti-api.service';
import { NotificationService } from '../../../services/layout-services/notification.service';
import { ConfirmDialogComponent } from '../../../layout-components/confirm-dialog/confirm-dialog.component';
import { DialogService } from '../../../services/layout-services/dialog.service';

@Component({
  selector: 'app-sks-create',
  templateUrl: './sks-create.component.html',
  styleUrls: ['./sks-create.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class SksCreateComponent implements OnInit {

  clienti = [];
  oems = oems;

  sksForm: FormGroup;

  // SS_KEY = '';
  SS_OEM = '';
  // SS_ACTIVATION_DATE = '';
  SS_EXPIRE = '';
  SS_SP_ID = '';
  // SS_SC_ID = '';
  // SS_ACTIVATED_BY = '';
  // SS_ACTIVATION_REFERENT = '';
  // SS_LAST_EDIT = '';

  constructor(
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private router: Router,
    private api: SksApiService,
    private clientiApi: ClientiApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.clientiApi.getCustomers()
      .subscribe(clienti => {
        const clientiMap = clienti.map(cliente => {
          const resClienti = {};
          resClienti['value'] = cliente['SC_ID'];
          resClienti['name'] = cliente['SC_NOME'];
          return resClienti;
        });
        // console.log(clientiMap);
        this.clienti = clientiMap;
      });
    this.sksForm = this.formBuilder.group({
      // 'SS_KEY': [null, Validators.required],
      'SS_OEM': [null, Validators.required],
      // 'SS_ACTIVATION_DATE': [null],
      'SS_EXPIRE': [null, Validators.required],
      // 'SS_SP_ID': [null, [Validators.required]],
      'SS_SC_ID': [null, [Validators.required]],
      // 'SS_ACTIVATED_BY': [null, Validators.required],
      // 'SS_ACTIVATION_REFERENT': [null, Validators.required],
      // 'SS_LAST_EDIT' : [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postSks(form)
      .subscribe(key => {
        this.dialogService.openConfirmDialog(`sks key ${key['SS_KEY']} creata. Vuoi inviarla al Cliente?`)
          .afterClosed().subscribe(res => {
            if (res) {
              this.router.navigate(['/sks-mailer', key['SS_KEY']]);
            } else {
              this.router.navigate(['/sks']);
            }
          });
      }, (err) => {
        console.log(err);
      });
  }

}
