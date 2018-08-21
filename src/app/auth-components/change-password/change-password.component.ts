import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { slideInOutAnimation } from "../../animations";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.data.getUserFromToken().subscribe(utente => {
      this.user = utente;
      console.log(utente['SU_ID']);
    });
    // this.data.currentUser.subscribe(user => { this.user = user; });

    this.getUtente();
    this.utenteForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'SU_LAST_EDIT': new Date()
    });
  }

  // TODO change with some passport method --> do not hash pwd yet
  getUtente() {
    this.data.getUserFromToken().subscribe(utente => {
      console.log(utente['SU_ID']);
      this.SU_ID = utente.SU_ID;
      this.utenteForm.setValue({
        username: utente.SU_UNA,
        password: '',
        SU_LAST_EDIT: new Date(),
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.auth.changePwd(form)
      .subscribe(res => {
        console.log(res['user']);
        localStorage.setItem('token', res['idToken']);
        alert(`password utente ${res['user']['SU_UNA']} cambiata correttamente`);
        this.sendUser(res['user']);
        this.router.navigate(['/clienti']);
      }, (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            alert('error changing password');
            this.router.navigate(['/changepwd']);
          }
        }
      });
  }

  sendUser(user) {
    this.data.changeUser(user);
  }
}
