import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { ErrorHandlerService } from "./../../services/shared-services/error-handler.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { UtentiApiService } from "../../services/api-services/utenti-api.service";
import { DataService } from "../../services/shared-services/data.service";
import { slideInOutAnimation } from "../../animations";
import { CustomizeService } from "../../services/shared-services/customize.service";
import { UploadFileService } from "../../services/api-services/upload.service";
import { NotificationService } from "../../services/layout-services/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class LoginComponent implements OnInit, OnDestroy {
  user: object;
  userId: number;
  lastLoginDate: any;
  utenteForm: FormGroup;

  SU_UNA: "";
  SU_PAW: "";

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userApi: UtentiApiService,
    private data: DataService,
    private uploadService: UploadFileService,
    private customizeService: CustomizeService,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    // this.getIp();
    this.utenteForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  getCurrentUser() {
    const getUser: Subscription = this.data.currentUser.subscribe(
      user => (this.user = user)
    );
    this.manager.subscriptions.push(getUser);
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.auth.loginUser(form).subscribe(
      res => {
        localStorage.setItem("token", res["idToken"]);
        this.userId = res["user"]["SU_ID"];
        this.lastLoginDate = Date.now();
        this.getCustomStyle();
        this.updateUser();
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            this.notificationService.warn("wrong user or password");
            this.router.navigate(["/login"]);
          }
        }
      }
    );
    this.manager.subscriptions.push(submitForm);
  }

  getCustomStyle() {
    const getStyle: Subscription = this.uploadService
      .getCustomStyle(this.userId)
      .subscribe(style => {
        // console.log(style);
        const customColors: string[] = [
          style["SCZ_PRIMARY_COLOR"],
          style["SCZ_ACCENT_COLOR"],
          style["SCZ_WARN_COLOR"]
        ];
        localStorage.setItem("customLogo", style["SCZ_LOGO_NAME"]);
        localStorage.setItem("customStyle", style["SCZ_THEME"]);
        localStorage.setItem("customColors", customColors.join("|"));
        this.customizeService.changeTheme(style["SCZ_THEME"]);
        this.customizeService.changeLogo(style["SCZ_LOGO_NAME"]);
        this.customizeService.changePrimaryColor(style["SCZ_PRIMARY_COLOR"]);
        this.customizeService.changeAccentColor(style["SCZ_ACCENT_COLOR"]);
        this.customizeService.changeWarnColor(style["SCZ_WARN_COLOR"]);
      });
    this.manager.subscriptions.push(getStyle);
  }

  updateUser() {
    const updateUser: Subscription = this.userApi
      .updateUtente(this.userId, { SU_LAST_LOGIN: this.lastLoginDate })
      .subscribe(user => {
        localStorage.setItem("userName", user["SU_UNA"]);
        this.sendUser(user);
        this.notificationService.success(`benvenuto ${user["SU_UNA"]}!`);
        this.data.changeUrl("/home");
        this.router.navigate(["/home"]);
      });
    this.manager.subscriptions.push(updateUser);
  }

  sendUser(user) {
    this.data.changeUser(user);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
