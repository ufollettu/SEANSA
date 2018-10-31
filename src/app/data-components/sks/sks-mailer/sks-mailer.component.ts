import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { ErrorHandlerService } from "./../../../services/shared-services/error-handler.service";
import { Component, OnInit } from "@angular/core";
import { slideInOutAnimation } from "../../../animations";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { SksApiService } from "../../../services/api-services/sks-api.service";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";

@Component({
  selector: "app-sks-mailer",
  templateUrl: "./sks-mailer.component.html",
  styleUrls: ["./sks-mailer.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class SksMailerComponent implements OnInit {
  sksMailerForm: FormGroup;
  email: "";
  message: "";

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: SksApiService,
    private authService: AuthService,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.sksMailerForm = this.manager.sksSendMailFormInit();
    this.manager.patchMailerFormValue(
      this.route.snapshot.params["id"],
      this.sksMailerForm
    );
  }

  onFormSubmit(form: NgForm) {
    this.manager.sksSendMailFormSubmit(form);
  }
}
