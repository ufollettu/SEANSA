import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { Subscription } from "rxjs";

@Component({
  selector: "app-matricole-create",
  templateUrl: "./matricole-create.component.html",
  styleUrls: ["./matricole-create.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class MatricoleCreateComponent implements OnInit, OnDestroy {
  sksId: any;
  matricoleForm: FormGroup;

  SM_MATRICOLA = "";
  SM_SS_ID = "";
  SM_DETTAGLI = "";
  SM_CREATION_DATE = "";
  SM_LAST_UPDATE = "";

  constructor(
    private route: ActivatedRoute,
    private manager: DataComponentsManagementService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      this.sksId = fragment;
    });
    this.onInitForm();
  }

  onInitForm() {
    this.matricoleForm = this.manager.matricoleFormInit(this.sksId);
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.manager.postMatricola(
      form,
      this.sksId,
      "/matricole"
    );
    this.manager.subscriptions.push(submitForm);
  }

  ngOnDestroy(): void {
    this.manager.unsubAll();
  }
}
