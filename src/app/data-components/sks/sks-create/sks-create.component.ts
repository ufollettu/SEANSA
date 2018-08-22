import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SksApiService } from '../sks-api.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations';
import { ClientiApiService } from '../../clienti/clienti-api.service';

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
  oems = [
    { value: 0, name: 'FULL', description: 'versione completa con tutti gli aggiornamenti e rinnovo licenza via web' },
    // tslint:disable-next-line:max-line-length
    { value: 1, name: 'OEM', description: 'versione con blocco scheda e limitazione degli aggiornamenti da web (no documenti - bollettini e firmware) con rinnovo licenze via web' },
    // tslint:disable-next-line:max-line-length
    { value: 2, name: 'OEM-D', description: 'versione senza blocco scheda ma con limitazione aggiornamenti da web (no documenti - bollettini e firmware) con rinnovo licenze via web' },
    // tslint:disable-next-line:max-line-length
    { value: 3, name: 'NO-TRAD', description: 'versione senza blocco scheda ma senza aggiornamenti da web (no documenti - bollettini e firmware) con rinnovo licenze via web' },
  ];

  // TODO crete function to hash sks key and put in form
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
    private router: Router, private api: SksApiService, private clientiApi: ClientiApiService, private formBuilder: FormBuilder) { }

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
      .subscribe(res => {
        alert(`sks key ${res['SS_KEY']} creata`);
        this.router.navigate(['/sks']);
      }, (err) => {
        console.log(err);
      });
  }

}
