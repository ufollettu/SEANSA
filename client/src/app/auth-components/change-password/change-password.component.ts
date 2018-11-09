import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { ErrorHandlerService } from "./../../services/shared-services/error-handler.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/shared-services/data.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth-services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { slideInOutAnimation } from "../../animations";
import { NotificationService } from "../../services/layout-services/notification.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  user: object;
  utenteForm: FormGroup;

  SU_ID: number;
  username: string;
  password: string;

  constructor(
    private notificationService: NotificationService,
    private data: DataService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    // this.data.currentUser.subscribe(user => { this.user = user; });
    this.getUtente();
    this.utenteForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      SU_LAST_EDIT: new Date()
    });
  }

  getUtente() {
    const getUser: Subscription = this.data
      .getUserFromToken()
      .subscribe(utente => {
        this.user = utente;
        this.SU_ID = utente["SU_ID"];
        this.utenteForm.setValue({
          username: utente["SU_UNA"],
          password: "",
          SU_LAST_EDIT: new Date()
        });
      });
    this.manager.subscriptions.push(getUser);
  }

  onFormSubmit(form: NgForm) {
    const submitForm = this.authService.changePwd(form).subscribe(
      res => {
        localStorage.setItem("token", res["idToken"]);
        this.sendUser(res["user"]);
        this.notificationService.success(
          `password utente ${res["user"]["SU_UNA"]} cambiata correttamente`
        );
        this.router.navigate(["/clienti"]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            this.notificationService.warn("error changing password");
            this.router.navigate(["/changepwd"]);
          }
        }
        this.authService.handleLoginError(err);
      }
    );
    this.manager.subscriptions.push(submitForm);
  }

  onBackward(url) {
    this.data.changeUrl(url);
    this.router.navigate([url]);
  }

  sendUser(user) {
    this.data.changeUser(user);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
