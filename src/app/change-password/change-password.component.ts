import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UtentiApiService } from "../utenti/utenti-api.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  user: object;
  ipAddress: any;
  utenteForm: FormGroup;

  SU_ID: '';
  SU_UNA: '';
  SU_PAW: '';

  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private api: UtentiApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user;
      this.getCustomer(this.user['SU_ID']);
    });

    this.utenteForm = this.formBuilder.group({
      SU_UNA: [null, Validators.required],
      SU_PAW: [null, Validators.required],
      SU_LAST_EDIT: new Date()
    });
  }

  // TODO change with some passport method --> do not hash pwd yet
  getCustomer(id) {
    this.api.getUtente(id)
      .subscribe(data => {
        this.SU_ID = data.SU_ID;
        this.utenteForm.setValue({
          SU_UNA: data.SU_UNA,
          SU_PAW: data.SU_PAW,
          SU_LAST_EDIT: new Date(),
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateUtente(this.user['SU_ID'], form).subscribe(
      res => {
        console.log(res);
        // const id = res['SC_ID'];
        alert(`password utente ${res['SU_UNA']} modificata`);
        this.router.navigate(['/utenti']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
