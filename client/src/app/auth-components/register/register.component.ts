import { ErrorHandlerService } from "./../../services/shared-services/error-handler.service";
import { CustomizeService } from "../../services/shared-services/customize.service";
import { HttpErrorResponse } from "@angular/common/http";
import { IpService } from "../../services/ip.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-services/auth.service";
import { DataService } from "../../services/shared-services/data.service";
import { slideInOutAnimation } from "../../animations";
import { UploadFileService } from "../../services/api-services/upload.service";
import { NotificationService } from "../../services/layout-services/notification.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class RegisterComponent implements OnInit {
  user: object;
  ipAddress: any;
  utenteForm: FormGroup;

  SU_UNA: "";
  SU_PAW: "";
  SU_LEVEL: "";
  // SU_LAST_LOGIN: '';
  // SU_CREATION: '';
  // SU_LAST_EDIT: '';
  // SU_LAST_IP: '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private ipService: IpService,
    private formBuilder: FormBuilder,
    private data: DataService,
    private auth: AuthService,
    private uploadService: UploadFileService,
    private customizeService: CustomizeService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.data.currentUser.subscribe(user => (this.user = user));
    // this.getIp();
    this.utenteForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      level: [0],
      SU_LAST_LOGIN: new Date(),
      SU_CREATION: new Date(),
      SU_LAST_EDIT: new Date(),
      deleted: [0],
      lastIp: [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.auth.registerUser(form).subscribe(
      res => {
        localStorage.setItem("token", res["idToken"]);
        const userId = res["user"]["SU_ID"];

        this.uploadService.getCustomStyle(userId).subscribe(style => {
          console.log(style);
          localStorage.setItem("customLogo", style["SCZ_LOGO_NAME"]);
          localStorage.setItem("customStyle", style["SCZ_THEME"]);
          this.customizeService.changeTheme(style["SCZ_THEME"]);
          this.customizeService.changeLogo(style["SCZ_LOGO_NAME"]);
        });
        this.sendUser(res["user"]);
        this.notificationService.success(
          `utente ${res["user"]["SU_UNA"]} creato`
        );
        this.router.navigate(["/clienti"]);
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            this.notificationService.warn("user exists");
            this.router.navigate(["/register"]);
          }
        }
      }
    );
  }

  sendUser(user) {
    this.data.changeUser(user);
  }
}
