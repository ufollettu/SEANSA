import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class ForgotPwdComponent implements OnInit {

  forgotPwdForm: FormGroup;
  username: '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.forgotPwdForm = this.formBuilder.group({
      'username': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.auth.forgotPassword(form)
      .subscribe(res => {
        alert('mail correctly sent, please wait for password reset');
      }, (err) => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            alert('username does not exists');
            this.router.navigate(['/forgot-pwd']);
          }
        }
      });
  }
}
