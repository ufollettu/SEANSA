import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientiApiService } from '../clienti-api.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations';

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

  constructor(private router: Router, private api: ClientiApiService, private formBuilder: FormBuilder) { }

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
        // const id = res['SC_ID'];
        alert(`cliente ${res['SC_NOME']} creato`);
        this.router.navigate(['/clienti']);
      }, (err) => {
        console.log(err);
      });
  }

}
