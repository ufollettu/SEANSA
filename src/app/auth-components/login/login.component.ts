import { Component, OnInit } from "@angular/core";
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
export class LoginComponent implements OnInit {
  user: object;
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
    private customizeService: CustomizeService
  ) {}

  ngOnInit() {
    this.data.currentUser.subscribe(user => (this.user = user));
    // this.getIp();
    this.utenteForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.auth.loginUser(form).subscribe(
      res => {
        localStorage.setItem("token", res["idToken"]);
        const userId = res["user"]["SU_ID"];
        const lastLoginDate = Date.now();

        this.uploadService.getCustomStyle(userId).subscribe(style => {
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

        this.userApi
          .updateUtente(userId, { SU_LAST_LOGIN: lastLoginDate })
          .subscribe(user => {
            localStorage.setItem("userName", user["SU_UNA"]);
            this.sendUser(user);
            this.notificationService.success(`benvenuto ${user["SU_UNA"]}!`);
            this.router.navigate(["/sks"]);
          });
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
  }

  sendUser(user) {
    this.data.changeUser(user);
  }
}
