import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtentiApiService } from '../../data-components/utenti/utenti-api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: object;
  utenteForm: FormGroup;

  SU_UNA: '';
  SU_PAW: '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userApi: UtentiApiService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user);
    // this.getIp();
    this.utenteForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.auth.loginUser(form)
      .subscribe(res => {
        localStorage.setItem('token', res['idToken']);

        const userId = res['user']['SU_ID'];
        const lastLoginDate = Date.now();

        this.userApi.updateUtente(userId, { 'SU_LAST_LOGIN': lastLoginDate })
          .subscribe(user => {
            // console.log(user);
            alert(`benvenuto ${user['SU_UNA']}!`);
            localStorage.setItem('userName', user['SU_UNA']);
            this.sendUser(user);
            this.router.navigate(['/clienti']);
          });

      }, (err) => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            alert('wrong user or password');
            this.router.navigate(['/login']);
          }
        }
      });
  }

  sendUser(user) {
    this.data.changeUser(user);
  }
}
