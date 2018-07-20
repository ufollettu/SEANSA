import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  utenteForm: FormGroup;

  SU_UNA: '';
  SU_PAW: '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    // this.getIp();
    this.utenteForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.auth.loginUser(form)
    .subscribe(res => {
      console.log(res);
      alert(`benvenuto ${res['user']['SU_UNA']}!`);
      this.router.navigate(['/']);
    }, (err) => {
      console.log(err);
    });
  }
}
