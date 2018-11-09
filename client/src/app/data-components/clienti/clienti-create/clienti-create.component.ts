import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-clienti-create",
  templateUrl: "./clienti-create.component.html",
  styleUrls: ["./clienti-create.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class ClientiCreateComponent implements OnInit, OnDestroy {
  clienteForm: FormGroup;

  SC_NOME = "";
  SC_PIVA = "";
  SC_COD_FISCALE = "";
  SC_INDIRIZZO = "";
  SC_EMAIL = "";
  SC_TELEFONO = "";
  SC_REFERENTE_NOME = "";
  SC_TEL_REFERENTE = "";
  SC_TS = "";

  constructor(
    private manager: DataComponentsManagementService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.onInitForm();
  }

  onInitForm() {
    this.clienteForm = this.manager.clientiFormInit();
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.manager.postCustomerFormSubmit(
      form,
      "/clienti"
    );
    this.manager.subscriptions.push(submitForm);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
