import { HttpErrorResponse } from "@angular/common/http";
import { RolesApiService } from "./../../../auth-components/roles/roles-api.service";
import { UtentiPermessi } from "./../../../models/utenti-permessi";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl,
  FormGroupDirective
} from "@angular/forms";
import { UtentiApiService } from "../../../services/api-services/utenti-api.service";
import { IpService } from "../../../services/ip.service";
import { ErrorStateMatcher } from "@angular/material";
import { slideInOutAnimation } from "../../../animations";
import { UploadFileService } from "../../../services/api-services/upload.service";
import { NotificationService } from "../../../services/layout-services/notification.service";

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
  selector: "app-utenti-create",
  templateUrl: "./utenti-create.component.html",
  styleUrls: ["./utenti-create.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class UtentiCreateComponent implements OnInit {
  ipAddress: any;
  utenteForm: FormGroup;
  matcher = new MyErrorStateMatcher();

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
    private api: UtentiApiService,
    private formBuilder: FormBuilder,
    private uploadService: UploadFileService,
    private rolesService: RolesApiService
  ) {}

  ngOnInit() {
    this.utenteForm = this.formBuilder.group({
      SU_UNA: [null, Validators.required],
      SU_PAW: [null, Validators.required],
      SU_LEVEL: [0],
      SU_LAST_LOGIN: new Date(),
      SU_CREATION: new Date(),
      SU_LAST_EDIT: new Date(),
      SU_LAST_IP: [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postUtente(form).subscribe(
      res => {
        const id = res["SU_ID"];
        const data = { UP_U_ID: res["SU_ID"], UP_P_ID: 4 };
        this.rolesService.postKey(data).subscribe(perm => {
          this.uploadService.postCustomization(id).subscribe(style => {
            this.notificationService.success(`utente ${res["SU_UNA"]} creato`);
            this.router.navigate(["/utenti"]);
          });
        });
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            this.notificationService.warn(
              "username exists or was previously deleted"
            );
          }
        }
      }
    );
  }
}
