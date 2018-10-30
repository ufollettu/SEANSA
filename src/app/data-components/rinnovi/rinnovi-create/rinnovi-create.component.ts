import { ErrorHandlerService } from "./../../../services/shared-services/error-handler.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RinnoviApiService } from "../../../services/api-services/rinnovi-api.service";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";

@Component({
  selector: "app-rinnovi-create",
  templateUrl: "./rinnovi-create.component.html",
  styleUrls: ["./rinnovi-create.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class RinnoviCreateComponent implements OnInit {
  rinnoviForm: FormGroup;

  SR_SS_ID = "";
  SR_TS = "";

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private api: RinnoviApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.rinnoviForm = this.formBuilder.group({
      SR_SS_ID: [null, Validators.required],
      SR_TS: new Date()
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postRinnovo(form).subscribe(
      res => {
        this.notificationService.success("rinnovo creato");
        this.router.navigate(["/rinnovi"]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }
}
