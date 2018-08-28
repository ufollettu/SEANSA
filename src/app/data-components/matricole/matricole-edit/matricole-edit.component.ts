import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatricoleApiService } from '../matricole-api.service';
import { slideInOutAnimation } from '../../../animations';

@Component({
  selector: 'app-matricole-edit',
  templateUrl: './matricole-edit.component.html',
  styleUrls: ['./matricole-edit.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class MatricoleEditComponent implements OnInit {

  matricoleForm: FormGroup;

  sm_id = '';
  SM_MATRICOLA = '';
  SM_SS_ID = '';
  SM_DETTAGLI = '';
  SM_CREATION_DATE = '';
  SM_LAST_UPDATE = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: MatricoleApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMatricola(this.route.snapshot.params['id']);
    this.matricoleForm = this.formBuilder.group({
      'SM_MATRICOLA': [null, Validators.required],
      'SM_SS_ID': [null, Validators.required],
      'SM_DETTAGLI': [null],
      'SM_CREATION_DATE': [null],
      'SM_LAST_UPDATE': [null, [Validators.required]]
    });
  }

  getMatricola(id) {
    this.api.getMatricoleBySks(id)
      .subscribe(data => {
        this.sm_id = data.sm_id;
        this.matricoleForm.setValue({
          SM_MATRICOLA: data.SM_MATRICOLA,
          SM_SS_ID: data.SM_SS_ID,
          SM_DETTAGLI: data.SM_DETTAGLI,
          SM_CREATION_DATE: data.SM_CREATION_DATE,
          SM_LAST_UPDATE: new Date()
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateMatricola(this.sm_id, form)
      .subscribe(res => {
        console.log(res);
        // const id = res['SC_ID'];
        alert(`Matricola ${res['sm_id']} aggiornata`);
        this.router.navigate(['/matricole']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  sksDetails() {
    this.router.navigate(['/matricole']);
  }

}
