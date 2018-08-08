import { HttpErrorResponse } from '@angular/common/http';
import { IpService } from '../../services/ip.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: object;
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
    private ipService: IpService,
    private formBuilder: FormBuilder,
    private data: DataService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user);
    // this.getIp();
    this.utenteForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'level': [0],
      'SU_LAST_LOGIN' : new Date(),
      'SU_CREATION': new Date(),
      'SU_LAST_EDIT': new Date(),
      'deleted': [0],
      'lastIp': [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.auth.registerUser(form)
    .subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res['idToken']);
      alert(`utente ${res['user']['SU_UNA']} creato`);
      this.sendUser(res['user']);
      this.router.navigate(['/clienti']);
    }, (err) => {
      console.log(err);
      if (err instanceof HttpErrorResponse ) {
        if (err.status === 422) {
          alert('user exists');
          this.router.navigate(['/register']);
        }
      }
    });
  }

  sendUser(user) {
    this.data.changeUser(user);
  }
}
