import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../../animations';
import { NotificationService } from '../../../services/layout-services/notification.service';
import { Router } from '@angular/router';
import { PacksApiService } from '../../../services/api-services/packs-api.service';
import { UtentiApiService } from '../../../services/api-services/utenti-api.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth-services/auth.service';
import { DataService } from '../../../services/shared-services/data.service';

@Component({
  selector: 'app-packs-create',
  templateUrl: './packs-create.component.html',
  styleUrls: ['./packs-create.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class PacksCreateComponent implements OnInit {

  utenti = [];
  packForm: FormGroup;

  // SPK_ID = 0,
  SPK_SU_CREATOR_ID = '';
  SPK_SU_OWNER_ID = '';
  SPK_EXPIRE = '';
  SPK_SKS_COUNT = '';
  SPK_USED_SKS_COUNT = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private api: PacksApiService,
    private utentiApi: UtentiApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.getUtente();
    this.utentiApi.getUtenti()
      .subscribe(utenti => {
        const utenteMap = utenti.map(utente => {
          const resUtenti = {};
          resUtenti['value'] = utente['SU_ID'];
          resUtenti['name'] = utente['SU_UNA'];
          return resUtenti;
        });
        this.utenti = utenteMap;
      });
    this.packForm = this.formBuilder.group({
      'SPK_SU_CREATOR_ID': [null],
      'SPK_SU_OWNER_ID': [null, Validators.required],
      'SPK_EXPIRE': [null, Validators.required],
      'SPK_SKS_COUNT': [null, Validators.required]
    });
  }

  getUtente() {
    this.data.getUserFromToken().subscribe(utente => {
      this.packForm.patchValue({
        SPK_SU_CREATOR_ID: utente['SU_ID']
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postPack(form)
      .subscribe(pack => {
        this.notificationService.success(`pack id: ${pack['SPK_ID']} creato`);
        this.router.navigate(['/packs']);
      }, (err) => {
        this.authService.handleLoginError(err);
      });
  }
}
