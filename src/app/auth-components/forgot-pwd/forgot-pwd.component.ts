import { ErrorHandlerService } from "./../../services/shared-services/error-handler.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { slideInOutAnimation } from "../../animations";
import { HttpErrorResponse } from "@angular/common/http";
import { Validators, NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-services/auth.service";
import { NotificationService } from "../../services/layout-services/notification.service";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-forgot-pwd",
  templateUrl: "./forgot-pwd.component.html",
  styleUrls: ["./forgot-pwd.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class ForgotPwdComponent implements OnInit, OnDestroy {
  forgotPwdForm: FormGroup;
  username: "";

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.forgotPwdForm = this.formBuilder.group({
      username: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.authService
      .forgotPassword(form)
      .subscribe(
        res => {
          this.notificationService.success(
            "mail correctly sent, please wait for password reset"
          );
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              this.notificationService.warn("username does not exists");
              this.router.navigate(["/forgot-pwd"]);
            }
          }
          this.authService.handleLoginError(err);
        }
      );
    this.manager.subscriptions.push(submitForm);
  }

  ngOnDestroy(): void {
    this.manager.unsubAll();
  }
}
