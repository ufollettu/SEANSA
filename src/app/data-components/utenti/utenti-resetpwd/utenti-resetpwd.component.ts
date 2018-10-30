import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl,
  FormGroupDirective
} from "@angular/forms";
import { UtentiApiService } from "../../../services/api-services/utenti-api.service";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";

@Component({
  selector: "app-utenti-resetpwd",
  templateUrl: "./utenti-resetpwd.component.html",
  styleUrls: ["./utenti-resetpwd.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class UtentiResetpwdComponent implements OnInit {
  ipAddress: any;
  utenteForm: FormGroup;

  SU_ID: number;
  SU_UNA: string;
  SU_PAW: string;
  SU_LEVEL: any;
  // SU_LAST_LOGIN: '';
  // SU_CREATION: '';
  // SU_LAST_EDIT: '';
  // SU_LAST_IP: '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: UtentiApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params["id"]);
    this.utenteForm = this.formBuilder.group({
      SU_UNA: [null, Validators.required],
      SU_PAW: [null, Validators.required],
      // 'SU_LEVEL': [0],
      // 'SU_LAST_LOGIN' : new Date(),
      // 'SU_CREATION': new Date(),
      SU_LAST_EDIT: new Date()
      // 'SU_LAST_IP': [null]
    });
  }

  getCustomer(id) {
    this.api.getUtente(id).subscribe(data => {
      this.SU_ID = data["SU_ID"];
      this.utenteForm.setValue({
        SU_UNA: data["SU_UNA"],
        SU_PAW: null,
        // SU_LEVEL: data.SU_LEVEL,
        SU_LAST_EDIT: new Date()
        // SU_LAST_IP: data.SU_LAST_IP
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateUtente(this.SU_ID, form).subscribe(
      res => {
        this.notificationService.success(
          `password utente ${res["SU_UNA"]} aggiornata`
        );
        this.router.navigate(["/utenti"]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }
}
