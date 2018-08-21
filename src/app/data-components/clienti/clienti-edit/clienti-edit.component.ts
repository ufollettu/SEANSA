import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientiApiService } from '../clienti-api.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations';

@Component({
  selector: 'app-clienti-edit',
  templateUrl: './clienti-edit.component.html',
  styleUrls: ['./clienti-edit.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class ClientiEditComponent implements OnInit {

  clienteForm: FormGroup;

  SC_ID = '';
  SC_NOME = '';
  SC_PIVA = '';
  SC_COD_FISCALE = '';
  SC_INDIRIZZO = '';
  SC_EMAIL = '';
  SC_TELEFONO = '';
  SC_REFERENTE_NOME = '';
  SC_TEL_REFERENTE = '';
  SC_TS = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ClientiApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params['id']);
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

  getCustomer(id) {
    this.api.getCustomer(id)
      .subscribe(data => {
        this.SC_ID = data.SC_ID;
        this.clienteForm.setValue({
          SC_NOME: data.SC_NOME,
          SC_PIVA: data.SC_PIVA,
          SC_COD_FISCALE: data.SC_COD_FISCALE,
          SC_INDIRIZZO: data.SC_INDIRIZZO,
          SC_EMAIL: data.SC_EMAIL,
          SC_TELEFONO: data.SC_TELEFONO,
          SC_REFERENTE_NOME: data.SC_REFERENTE_NOME,
          SC_TEL_REFERENTE: data.SC_TEL_REFERENTE
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateCustomer(this.SC_ID, form)
      .subscribe(res => {
        console.log(res);
        // const id = res['SC_ID'];
        alert(`cliente ${res['SC_NOME']} aggiornato`);
        this.router.navigate(['/clienti']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  clientiDetails() {
    this.router.navigate(['/clienti']);
  }

}
