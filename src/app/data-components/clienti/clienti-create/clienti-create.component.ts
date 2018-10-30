import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientiApiService } from "../../../services/api-services/clienti-api.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";

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
export class ClientiCreateComponent implements OnInit {
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

  constructor(private manager: DataComponentsManagementService) {}

  ngOnInit() {
    this.onInitForm();
  }

  onInitForm() {
    this.clienteForm = this.manager.clientiFormInit();
  }

  onFormSubmit(form: NgForm) {
    this.manager.postCustomer(form, "/clienti");
  }
}
