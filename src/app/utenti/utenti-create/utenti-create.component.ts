import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UtentiApiService } from '../utenti-api.service';

@Component({
  selector: 'app-utenti-create',
  templateUrl: './utenti-create.component.html',
  styleUrls: ['./utenti-create.component.css']
})
export class UtentiCreateComponent implements OnInit {

  ipAddress: any;
  utenteForm: FormGroup;

  SU_UNA: '';
  SU_PAW: '';
  SU_LEVEL: '';
  // SU_LAST_LOGIN: '';
  // SU_CREATION: '';
  // SU_LAST_EDIT: '';
  // SU_LAST_IP: '';

  constructor(private router: Router, private api: UtentiApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.getIp();
    this.utenteForm = this.formBuilder.group({
      'SU_UNA': [null, Validators.required],
      'SU_PAW': [null, Validators.required],
      'SU_LEVEL': [null, Validators.required],
      'SU_LAST_LOGIN' : new Date(),
      'SU_CREATION': new Date(),
      'SU_LAST_EDIT': new Date(),
      'SU_LAST_IP': [this.getIp(), Validators.required]
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

  getIp() {
    this.api.getIpAddress()
    .subscribe(data => {
      console.log('ip', data.ip);
      return this.ipAddress = data.ip;
    });
  }
}
