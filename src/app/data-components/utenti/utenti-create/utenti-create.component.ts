import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";

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
export class UtentiCreateComponent implements OnInit, OnDestroy {
  ipAddress: any;
  utenteForm: FormGroup;

  SU_UNA: "";
  SU_PAW: "";
  SU_LEVEL: "";

  constructor(
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.utenteForm = this.manager.usersFormInit();
  }

  onFormSubmit(form: NgForm) {
    const formSubmit: Subscription = this.manager.usersFormSubmit(
      form,
      "/utenti"
    );
    this.manager.subscriptions.push(formSubmit);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
