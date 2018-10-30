import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RinnoviApiService } from "../../../services/api-services/rinnovi-api.service";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";

@Component({
  selector: "app-rinnovi-edit",
  templateUrl: "./rinnovi-edit.component.html",
  styleUrls: ["./rinnovi-edit.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class RinnoviEditComponent implements OnInit {
  rinnoviForm: FormGroup;

  SR_ID = 0;
  SR_SS_ID = "";
  SR_TS = "";

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: RinnoviApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.getRinnovo(this.route.snapshot.params["id"]);
    this.rinnoviForm = this.formBuilder.group({
      SR_SS_ID: [null, Validators.required],
      SR_TS: new Date()
    });
  }

  getRinnovo(id) {
    this.api.getRinnovo(id).subscribe(data => {
      this.SR_ID = data["SR_ID"];
      this.rinnoviForm.setValue({
        SR_SS_ID: data["SR_SS_ID"],
        SR_TS: data["SR_TS"]
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateRinnovo(this.SR_ID, form).subscribe(
      res => {
        this.notificationService.success("rinnovo aggiornato");
        this.router.navigate(["/rinnovi"]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  rinnoviDetails() {
    this.router.navigate(["/rinnovi"]);
  }
}
