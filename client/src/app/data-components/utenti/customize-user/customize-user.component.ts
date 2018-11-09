import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { Component, OnInit, OnDestroy, ViewContainerRef } from "@angular/core";
import { slideInOutAnimation } from "../../../animations";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../../../services/shared-services/data.service";
import { CustomizeService } from "../../../services/shared-services/customize.service";
import { UploadFileService } from "../../../services/api-services/upload.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";
import { ColorPickerService, Cmyk } from "ngx-color-picker";
import { Subscription } from "rxjs";
import * as moment from "moment";

/** Error when invalid control is dirty, touched, or submitted. */
/** TODO copy error matcher in all components */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-customize-user",
  templateUrl: "./customize-user.component.html",
  styleUrls: ["./customize-user.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class CustomizeUserComponent implements OnInit, OnDestroy {
  themes: string[] = [
    "default",
    "light",
    "dark",
    "orange",
    "red",
    "blue",
    "custom"
  ];
  userId = 0;
  username;
  currentUsername;
  userTheme = "";
  logo = "";
  url = "../../assets/images/placeholder.png";
  formdata: FormData = new FormData();
  selectedFile: File = null;

  public primaryColor = "rgb(0, 0, 255)";
  public accentColor = "rgb(255, 255, 0)";
  public warnColor = "rgb(255, 0, 0)";

  constructor(
    public vcRef: ViewContainerRef,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadFileService,
    private customizeService: CustomizeService,
    private authService: AuthService,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.styleInit();
    this.getUserTheme();
    this.currentUsername = this.authService.getUsername();
  }

  getUserTheme() {
    const logoSub: Subscription = this.customizeService.currentLogo.subscribe(
      logo => {
        this.logo = logo;
      }
    );
    const themeSub: Subscription = this.customizeService.currentTheme.subscribe(
      theme => {
        this.userTheme = theme || "default-theme";
      }
    );
    // custom color picker
    const pColorSub: Subscription = this.customizeService.currentPrimaryColor.subscribe(
      pColor => {
        this.primaryColor = pColor;
      }
    );
    const aColorSub: Subscription = this.customizeService.currentAccentColor.subscribe(
      aColor => {
        this.accentColor = aColor;
      }
    );
    const wColorSub: Subscription = this.customizeService.currentWarnColor.subscribe(
      wColor => {
        this.warnColor = wColor;
      }
    );
    this.manager.subscriptions.push(
      logoSub,
      themeSub,
      pColorSub,
      aColorSub,
      wColorSub
    );
  }

  styleInit() {
    const id = this.route.snapshot.params["id"];
    this.username = this.route.snapshot.fragment;
    const getStyle: Subscription = this.uploadService
      .getCustomStyle(id)
      .subscribe(style => {
        this.userTheme = style["SCZ_THEME"];
        this.logo = style["SCZ_LOGO_NAME"];
        this.userId = style["SCZ_SU_ID"];
        this.url = `../../assets/images/${style["SCZ_LOGO_NAME"]}` || this.url;
        this.onSetTheme(style["SCZ_THEME"]);
        this.customizeService.changeLogo(style["SCZ_LOGO_NAME"]);
        this.customizeService.changePrimaryColor(style["SCZ_PRIMARY_COLOR"]);
        this.customizeService.changeAccentColor(style["SCZ_ACCENT_COLOR"]);
        this.customizeService.changeWarnColor(style["SCZ_WARN_COLOR"]);
      });
    this.manager.subscriptions.push(getStyle);
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = _event => {
        this.url = _event.target["result"];
        this.customizeService.changeLogo(_event.target["result"]);
      };
    }
  }

  onPrimaryColorChange(primaryColor: any): void {
    this.customizeService.changePrimaryColor(primaryColor);
  }

  onAccentColorChange(accentColor: any): void {
    this.customizeService.changeAccentColor(accentColor);
  }

  onWarnColorChange(warnColor: any): void {
    this.customizeService.changeWarnColor(warnColor);
  }

  onSetTheme(theme) {
    this.customizeService.changeTheme(theme);
  }

  upload() {
    this.formdata.append("logo", this.selectedFile);
    this.formdata.append("SCZ_SU_ID", this.userId.toString());
    this.formdata.append("SCZ_THEME", this.userTheme);
    this.formdata.append("SCZ_PRIMARY_COLOR", this.primaryColor);
    this.formdata.append("SCZ_ACCENT_COLOR", this.accentColor);
    this.formdata.append("SCZ_WARN_COLOR", this.warnColor);

    if (this.currentUsername === this.username) {
      const logoName =
        this.selectedFile !== null
          ? `logo-${moment().format("YYYYMMDDhhmm")}-${this.selectedFile.name}`
          : localStorage.getItem("customLogo");
      localStorage.setItem("customLogo", logoName);
      localStorage.setItem("customStyle", this.userTheme);
      const customColorsArr = Array.of(
        this.primaryColor,
        this.accentColor,
        this.warnColor
      );
      localStorage.setItem("customColors", customColorsArr.join("|"));
    }

    const upload: Subscription = this.uploadService
      .pushFileToStorage(this.userId, this.formdata)
      .subscribe(
        res => {
          if (res instanceof HttpResponse) {
            this.notificationService.success(
              `user id: ${this.userId} style and logo updated`
            );
            this.router.navigate(["/utenti"]);
          }
        },
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422 || 500) {
              this.notificationService.warn(
                "error uploading file, please try again"
              );
              this.router.navigate(["/utenti"]);
            }
          }
          this.authService.handleLoginError(err);
        }
      );
    this.manager.subscriptions.push(upload);
  }

  resetLogo() {
    const oldLogo = localStorage.getItem("customLogo");
    this.customizeService.changeLogo(oldLogo);
  }

  resetTheme() {
    const oldTheme = localStorage.getItem("customStyle");
    this.customizeService.changeTheme(oldTheme);
  }

  resetColors() {
    const oldColors = localStorage.getItem("customColors");
    this.customizeService.changePrimaryColor(oldColors.split("|")[0]);
    this.customizeService.changeAccentColor(oldColors.split("|")[1]);
    this.customizeService.changeWarnColor(oldColors.split("|")[2]);
  }

  imgError() {
    this.url = "../../assets/images/placeholder.png";
  }

  ngOnDestroy() {
    this.resetLogo();
    this.resetTheme();
    this.resetColors();
    this.manager.unsubAll();
  }
}
