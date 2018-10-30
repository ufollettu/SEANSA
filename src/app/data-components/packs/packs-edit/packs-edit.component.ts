import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit } from "@angular/core";
import { slideInOutAnimation } from "../../../animations";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";

@Component({
  selector: "app-packs-edit",
  templateUrl: "./packs-edit.component.html",
  styleUrls: ["./packs-edit.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class PacksEditComponent implements OnInit {
  utenti = [];
  packForm: FormGroup;

  SPK_ID = 0;
  SPK_SU_CREATOR_ID = "";
  SPK_SU_OWNER_ID = "";
  SPK_EXPIRE = "";
  SPK_SKS_COUNT = "";
  SPK_USED_SKS_COUNT = "";

  constructor(
    private route: ActivatedRoute,
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
    this.manager.getPack(this.route.snapshot.params["id"], this.packForm);
  }

  fetchUtenti() {
    this.manager.getUtenti();
  }

  onFormSubmit(form: NgForm) {
    this.manager.updatePack(this.route.snapshot.params["id"], form, "/packs");
  }
}
