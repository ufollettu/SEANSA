import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UtentiApiService } from "../../../services/api-services/utenti-api.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";

@Component({
  selector: "app-utenti-edit",
  templateUrl: "./utenti-edit.component.html",
  styleUrls: ["./utenti-edit.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class UtentiEditComponent implements OnInit {
  ipAddress: any;
  utenteForm: FormGroup;

  SU_ID: number;
  SU_UNA: string;
  SU_PAW: string;
  // SU_LAST_LOGIN: '';
  // SU_CREATION: '';
  // SU_LAST_EDIT: '';
  // SU_LAST_IP: '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: UtentiApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params["id"]);
    this.utenteForm = this.formBuilder.group({
      SU_UNA: [null, Validators.required],
      SU_PAW: [null, Validators.required],
      // 'SU_LAST_LOGIN' : new Date(),
      // 'SU_CREATION': new Date(),
      SU_LAST_EDIT: new Date(),
      SU_LAST_IP: [null, Validators.required]
    });
  }

  getCustomer(id) {
    this.api.getUtente(id).subscribe(data => {
      this.SU_ID = data.SU_ID;
      this.utenteForm.setValue({
        SU_UNA: data.SU_UNA,
        SU_PAW: data.SU_PAW,
        SU_LAST_EDIT: new Date(),
        SU_LAST_IP: data.SU_LAST_IP
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateUtente(this.SU_ID, form).subscribe(
      res => {
        this.notificationService.success(`utente ${res["SU_UNA"]} aggiornato`);
        this.router.navigate(["/utenti"]);
      },
      err => {
        console.log(err);
      }
    );
  }

  utentiDetails() {
    this.router.navigate(["/utenti"]);
  }
}
