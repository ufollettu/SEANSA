import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '../../../node_modules/@angular/forms';
import { UtentiApiService } from '../utenti/utenti-api.service';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ipAddress: any;
  utenteForm: FormGroup;

  SU_UNA: '';
  SU_PAW: '';
  SU_LEVEL: '';
  // SU_LAST_LOGIN: '';
  // SU_CREATION: '';
  // SU_LAST_EDIT: '';
  // SU_LAST_IP: '';

  constructor(
    private router: Router,
    private api: UtentiApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    // this.getIp();
    this.utenteForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'level': [null, Validators.required],
      'SU_LAST_LOGIN' : new Date(),
      'SU_CREATION': new Date(),
      'SU_LAST_EDIT': new Date(),
      'lastIp': [this.getIp(), Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.auth.registerUser(form)
    .subscribe(res => {
      // console.log(res);
      alert(`utente ${res['user']['SU_UNA']} creato`);
      this.router.navigate(['/']);
    }, (err) => {
      console.log(err);
    });
  }

  getIp() {
    this.api.getIpAddress()
    .subscribe(data => {
      // console.log('ip', data.ip);
      return this.ipAddress = data.ip;
    });
  }
}
