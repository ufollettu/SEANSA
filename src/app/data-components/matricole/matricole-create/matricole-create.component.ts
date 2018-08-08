import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatricoleApiService } from '../matricole-api.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-matricole-create',
  templateUrl: './matricole-create.component.html',
  styleUrls: ['./matricole-create.component.css']
})
export class MatricoleCreateComponent implements OnInit {

  matricoleForm: FormGroup;

  SM_MATRICOLA = '';
  SM_SS_ID = '';
  SM_DETTAGLI = '';
  SM_CREATION_DATE = '';
  SM_LAST_UPDATE = '';

  constructor(private router: Router, private api: MatricoleApiService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.matricoleForm = this.formBuilder.group({
      'SM_MATRICOLA' : [null, Validators.required],
      'SM_SS_ID' : [null, Validators.required],
      'SM_DETTAGLI' : [null],
      'SM_CREATION_DATE' : new Date(),
      'SM_LAST_UPDATE' : new Date()
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postMatricola(form)
      .subscribe(res => {
      alert(`matricola ${res['SM_MATRICOLA']} creata`);
          this.router.navigate(['/matricole']);
        }, (err) => {
          console.log(err);
        });
  }

}
