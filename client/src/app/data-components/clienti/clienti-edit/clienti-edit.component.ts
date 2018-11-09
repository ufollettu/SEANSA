import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";

@Component({
  selector: "app-clienti-edit",
  templateUrl: "./clienti-edit.component.html",
  styleUrls: ["./clienti-edit.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class ClientiEditComponent implements OnInit, OnDestroy {
  clienteForm: FormGroup;

  SC_ID = 0;
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
    private router: Router,
    private route: ActivatedRoute,
    private manager: DataComponentsManagementService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.clienteForm = this.manager.clientiFormInit();
    this.onGetCustomer(this.route.snapshot.params["id"], this.clienteForm);
  }

  onGetCustomer(id, form) {
    const getCustomer: Subscription = this.manager.getCustomer(id, form);
    this.manager.subscriptions.push(getCustomer);
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.manager.updateCustomer(
      this.route.snapshot.params["id"],
      form,
      "/clienti"
    );
    this.manager.subscriptions.push(submitForm);
  }

  clientiDetails() {
    this.router.navigate(["/clienti"]);
  }

  ngOnDestroy(): void {
    this.manager.unsubAll();
  }
}
