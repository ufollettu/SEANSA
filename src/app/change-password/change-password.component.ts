import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UtentiApiService } from "../utenti/utenti-api.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { HttpErrorResponse } from "../../../node_modules/@angular/common/http";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {

  user: object;
  utenteForm: FormGroup;

  SU_ID: '';
  username: '';
  password: '';

  constructor(
    private data: DataService,
    private router: Router,
    private auth: AuthService,
    private api: UtentiApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user;
      this.getCustomer(this.user['SU_ID']);
    });

    this.utenteForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'SU_LAST_EDIT': new Date()
    });
  }

  // TODO change with some passport method --> do not hash pwd yet
  getCustomer(id) {
    this.api.getUtente(id)
      .subscribe(data => {
        this.SU_ID = data.SU_ID;
        this.utenteForm.setValue({
          username: data.SU_UNA,
          password: data.SU_PAW,
          SU_LAST_EDIT: new Date(),
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.auth.changePwd(form)
    .subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res['idToken']);
      alert(`password utente ${res['user']['SU_UNA']} cambiata correttamente`);
      this.router.navigate(['/clienti']);
    }, (err) => {
      if (err instanceof HttpErrorResponse ) {
        if (err.status === 422) {
          alert('error changing password');
          this.router.navigate(['/changepwd']);
        }
      }
    });
  }
}
