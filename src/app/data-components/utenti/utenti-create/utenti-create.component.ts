import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { UtentiApiService } from '../utenti-api.service';
import { IpService } from '../../../services/ip.service';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
/** TODO copy error matcher in all components */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-utenti-create',
  templateUrl: './utenti-create.component.html',
  styleUrls: ['./utenti-create.component.css']
})
export class UtentiCreateComponent implements OnInit {

  ipAddress: any;
  utenteForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  SU_UNA: '';
  SU_PAW: '';
  SU_LEVEL: '';
  // SU_LAST_LOGIN: '';
  // SU_CREATION: '';
  // SU_LAST_EDIT: '';
  // SU_LAST_IP: '';

  constructor(private router: Router, private api: UtentiApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.utenteForm = this.formBuilder.group({
      'SU_UNA': [null, Validators.required],
      'SU_PAW': [null, Validators.required],
      'SU_LEVEL': [0],
      'SU_LAST_LOGIN' : new Date(),
      'SU_CREATION': new Date(),
      'SU_LAST_EDIT': new Date(),
      'SU_LAST_IP': [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postUtente(form)
      .subscribe(res => {
          // const id = res['SC_ID'];
          alert(`utente ${res['SU_UNA']} creato`);
          this.router.navigate(['/utenti']);
        }, (err) => {
          console.log(err);
        });
  }
}
