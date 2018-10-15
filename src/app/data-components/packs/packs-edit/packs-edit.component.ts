import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../../animations';
import { NotificationService } from '../../../services/layout-services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PacksApiService } from '../../../services/api-services/packs-api.service';
import { UtentiApiService } from '../../../services/api-services/utenti-api.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth-services/auth.service';
import { DataService } from '../../../services/shared-services/data.service';

@Component({
  selector: 'app-packs-edit',
  templateUrl: './packs-edit.component.html',
  styleUrls: ['./packs-edit.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class PacksEditComponent implements OnInit {

  utenti = [];
  packForm: FormGroup;

  SPK_ID = 0;
  SPK_SU_CREATOR_ID = '';
  SPK_SU_OWNER_ID = '';
  SPK_EXPIRE = '';
  SPK_SKS_COUNT = '';
  SPK_USED_SKS_COUNT = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: PacksApiService,
    private utentiApi: UtentiApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.getUtente(this.route.snapshot.params['id']);
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

  getUtente(id) {
    this.api.getPack(id).subscribe(pack => {
      this.SPK_ID = pack['SPK_ID'];
      this.packForm.patchValue({
        SPK_SU_CREATOR_ID: pack['SPK_SU_CREATOR_ID'],
        SPK_SU_OWNER_ID: pack['SPK_SU_OWNER_ID'],
        SPK_EXPIRE: pack['SPK_EXPIRE'],
        SPK_SKS_COUNT: pack['SPK_SKS_COUNT']
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updatePack(this.SPK_ID, form)
      .subscribe(pack => {
        this.notificationService.success(`pack id: ${pack['SPK_ID']} aggiornato`);
        this.router.navigate(['/packs']);
      }, (err) => {
        this.authService.handleLoginError(err);
      });
  }

}
