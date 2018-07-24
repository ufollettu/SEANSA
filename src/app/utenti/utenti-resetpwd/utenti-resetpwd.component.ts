import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { UtentiApiService } from '../utenti-api.service';
import { IpService } from '../../ip.service';
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
  selector: 'app-utenti-resetpwd',
  templateUrl: './utenti-resetpwd.component.html',
  styleUrls: ['./utenti-resetpwd.component.css']
})
export class UtentiResetpwdComponent implements OnInit {

  ipAddress: any;
  utenteForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  SU_ID: '';
  SU_UNA: '';
  SU_PAW: '';
  SU_LEVEL: '';
  // SU_LAST_LOGIN: '';
  // SU_CREATION: '';
  // SU_LAST_EDIT: '';
  // SU_LAST_IP: '';

  constructor(private router: Router, private route: ActivatedRoute, private api: UtentiApiService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.getCustomer(this.route.snapshot.params['id']);
    this.utenteForm = this.formBuilder.group({
      'SU_UNA': [null, Validators.required],
      'SU_PAW': [null, Validators.required],
      // 'SU_LEVEL': [0],
      // 'SU_LAST_LOGIN' : new Date(),
      // 'SU_CREATION': new Date(),
      'SU_LAST_EDIT': new Date(),
      // 'SU_LAST_IP': [null]
    });
  }

  getCustomer(id) {
    this.api.getUtente(id)
      .subscribe(data => {
        this.SU_ID = data.SU_ID;
        this.utenteForm.setValue({
          SU_UNA: data.SU_UNA,
          SU_PAW: null,
          // SU_LEVEL: data.SU_LEVEL,
          SU_LAST_EDIT: new Date(),
          // SU_LAST_IP: data.SU_LAST_IP
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateUtente(this.SU_ID, form)
      .subscribe(res => {
          console.log(res);
          alert(`password utente ${res['SU_UNA']} aggiornata`);
          this.router.navigate(['/utenti']);
        }, (err) => {
          console.log(err);
        });
  }

}
