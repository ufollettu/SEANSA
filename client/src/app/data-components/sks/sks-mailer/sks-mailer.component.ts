import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { ErrorHandlerService } from "./../../../services/shared-services/error-handler.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { slideInOutAnimation } from "../../../animations";
import { FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

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
export class SksMailerComponent implements OnInit, OnDestroy {
  sksMailerForm: FormGroup;
  email: "";
  message: "";

  constructor(
    private route: ActivatedRoute,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.sksMailerForm = this.manager.sksSendMailFormInit();
    this.patchMailerValue();
  }

  patchMailerValue() {
    this.manager.patchMailerFormValue(
      this.route.snapshot.params["id"],
      this.sksMailerForm
    );
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.manager.sksSendMailFormSubmit(form);
    this.manager.subscriptions.push(submitForm);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
