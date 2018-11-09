import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
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
export class UtentiResetpwdComponent implements OnInit, OnDestroy {
  ipAddress: any;
  utenteForm: FormGroup;

  SU_ID: number;
  SU_UNA: string;
  SU_PAW: string;
  SU_LEVEL: any;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: UtentiApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.utenteForm = this.manager.resetPwdFormInit();
    this.getUser(this.route.snapshot.params["id"]);
  }

  getUser(id) {
    const getUser: Subscription = this.manager.getUser(id, this.utenteForm);
    this.manager.subscriptions.push(getUser);
  }

  onFormSubmit(form: NgForm) {
    const formSubmit: Subscription = this.manager.resetPwdFormSubmit(
      this.route.snapshot.params["id"],
      form,
      "/utenti"
    );
    this.manager.subscriptions.push(formSubmit);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
