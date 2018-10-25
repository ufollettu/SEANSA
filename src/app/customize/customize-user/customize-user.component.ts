import { Component, OnInit, OnDestroy } from "@angular/core";
import { slideInOutAnimation } from "../../animations";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../../services/shared-services/data.service";
import { CustomizeService } from "../../services/shared-services/customize.service";
import { UploadFileService } from "../../services/api-services/upload.service";
import {
  HttpResponse,
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
import { NotificationService } from "../../services/layout-services/notification.service";
import { AuthService } from "../../services/auth-services/auth.service";

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
  selector: 'app-customize-user',
  templateUrl: './customize-user.component.html',
  styleUrls: ['./customize-user.component.css'],
    // make slide in/out animation available to this component
    animations: [slideInOutAnimation],
    // attach the slide in/out animation to the host (root) element of this component
    // tslint:disable-next-line:use-host-property-decorator
    host: { "[@slideInOutAnimation]": "" }
})
export class CustomizeUserComponent implements OnInit, OnDestroy {

  themes: string[] = ["default", "light", "dark", "orange", "red", "blue"];
  userId = 0;
  userTheme = "";
  logo = "";
  url = "../../assets/images/placeholder.png";
  formdata: FormData = new FormData();
  selectedFile: File = null;

  constructor(
    private notificationService: NotificationService,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadFileService,
    private customizeService: CustomizeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.styleInit();

    this.customizeService.currentLogo.subscribe(logo => {
      this.logo = logo;
    });
    this.customizeService.currentTheme.subscribe(theme => {
      this.userTheme = theme || "default-theme";
    });

  }

  styleInit() {
    const id = this.route.snapshot.params['id'];
    this.uploadService.getCustomStyle(id).subscribe(style => {
      this.userTheme = style['SCZ_THEME'];
      this.logo = style['SCZ_LOGO_NAME'];
      this.userId = style['SCZ_SU_ID'];
      this.url = `../../assets/images/${style['SCZ_LOGO_NAME']}` || this.url;
      this.onSetTheme(style['SCZ_THEME']);
      this.customizeService.changeLogo(style['SCZ_LOGO_NAME']);
    });
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

  onSetTheme(theme) {
    this.customizeService.changeTheme(theme);
  }

  upload() {
    this.formdata.append("logo", this.selectedFile);
    this.formdata.append("SCZ_SU_ID", this.userId.toString());
    this.formdata.append("SCZ_THEME", this.userTheme);

    this.uploadService.pushFileToStorage(this.userId, this.formdata).subscribe(
      res => {
        if (res instanceof HttpResponse) {
          this.notificationService.success(`user id: ${this.userId} style and logo updated`);
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
  }

  resetLogo() {
    const oldLogo = localStorage.getItem("customLogo");
    this.customizeService.changeLogo(oldLogo);
  }

  resetTheme() {
    const oldTheme = localStorage.getItem("customStyle");
    this.customizeService.changeTheme(oldTheme);
  }

  imgError() {
    this.url = "../../assets/images/placeholder.png";
  }

  ngOnDestroy() {
    this.resetLogo();
    this.resetTheme();
  }
}
