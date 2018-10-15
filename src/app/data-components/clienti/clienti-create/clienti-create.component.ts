import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientiApiService } from '../../../services/api-services/clienti-api.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations';
import { NotificationService } from '../../../services/layout-services/notification.service';
import { AuthService } from '../../../services/auth-services/auth.service';

@Component({
  selector: 'app-clienti-create',
  templateUrl: './clienti-create.component.html',
  styleUrls: ['./clienti-create.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class ClientiCreateComponent implements OnInit {

  clienteForm: FormGroup;

  SC_NOME = '';
  SC_PIVA = '';
  SC_COD_FISCALE = '';
  SC_INDIRIZZO = '';
  SC_EMAIL = '';
  SC_TELEFONO = '';
  SC_REFERENTE_NOME = '';
  SC_TEL_REFERENTE = '';
  SC_TS = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private api: ClientiApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      'SC_NOME': [null, Validators.required],
      'SC_PIVA': [null],
      'SC_COD_FISCALE': [null],
      'SC_INDIRIZZO': [null, Validators.required],
      'SC_EMAIL': [null, [Validators.required, Validators.email]],
      'SC_TELEFONO': [null],
      'SC_REFERENTE_NOME': [null, Validators.required],
      'SC_TEL_REFERENTE': [null, Validators.required],
      // 'SC_TS' : [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postCustomer(form)
      .subscribe(res => {
        this.notificationService.success(`cliente ${res['SC_NOME']} creato`);
        this.router.navigate(['/clienti']);
      }, (err) => {
        this.authService.handleLoginError(err);
      });
  }

}
