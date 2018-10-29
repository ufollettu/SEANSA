import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ClientiApiService } from "../../../services/api-services/clienti-api.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";

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
export class ClientiEditComponent implements OnInit {
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
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ClientiApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataComponentsManagementService: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.clienteForm = this.dataComponentsManagementService.clientiFormInit();
    this.onGetCustomer(this.route.snapshot.params["id"], this.clienteForm);
  }

  onGetCustomer(id, form) {
    this.dataComponentsManagementService.getCustomer(id, form);
  }

  onFormSubmit(form: NgForm) {
    this.dataComponentsManagementService.updateCustomer(
      this.route.snapshot.params["id"],
      form,
      "/clienti"
    );
  }

  clientiDetails() {
    this.router.navigate(["/clienti"]);
  }
}
