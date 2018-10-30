import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit } from "@angular/core";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { Router } from "@angular/router";
import { PacksApiService } from "../../../services/api-services/packs-api.service";
import { UtentiApiService } from "../../../services/api-services/utenti-api.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { AuthService } from "../../../services/auth-services/auth.service";
import { DataService } from "../../../services/shared-services/data.service";

@Component({
  selector: "app-packs-create",
  templateUrl: "./packs-create.component.html",
  styleUrls: ["./packs-create.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class PacksCreateComponent implements OnInit {
  utenti = [];
  packForm: FormGroup;

  // SPK_ID = 0,
  SPK_SU_CREATOR_ID = "";
  SPK_SU_OWNER_ID = "";
  SPK_EXPIRE = "";
  SPK_SKS_COUNT = "";
  SPK_USED_SKS_COUNT = "";

  constructor(
    private data: DataService,
    private manager: DataComponentsManagementService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.onFormInit();
    this.fetchUtenti();
    this.utenti = this.manager.mapUtenti();
  }

  onFormInit() {
    this.packForm = this.manager.packsFormInit();
    this.getUtente(this.packForm);
  }

  fetchUtenti() {
    this.manager.getUtenti();
  }
  getUtente(form) {
    this.data.getUserIdFromToken().subscribe(userId => {
      form.patchValue({
        SPK_SU_CREATOR_ID: userId
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.manager.postPack(form, "/packs");
  }
}
