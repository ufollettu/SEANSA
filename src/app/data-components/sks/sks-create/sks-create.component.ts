import { ErrorHandlerService } from "./../../../services/shared-services/error-handler.service";
import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { Packs } from "src/app/models/packs";

@Component({
  selector: "app-sks-create",
  templateUrl: "./sks-create.component.html",
  styleUrls: ["./sks-create.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class SksCreateComponent implements OnInit {
  clientiMap = [];
  oems;
  sksForm: FormGroup;
  packs: Packs[];
  selectedPack;
  isPack: boolean;
  SS_OEM = "";
  SS_EXPIRE = "";
  SS_SP_ID = "";
  SS_SPK_ID = "";

  constructor(
    private route: ActivatedRoute,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {
    this.isPack = false;
    this.packs = [];
  }

  ngOnInit() {
    this.oems = this.manager.oems;
    this.route.data.pipe(map(data => data.checkPack)).subscribe(res => {
      this.packs = res;
      console.log(this.packs[0]);
      if (this.packs[0] === undefined) {
        this.selectedPack = "none";
        this.isPack = false;
      } else {
        this.selectedPack = this.packs[0];
        this.isPack = true;
      }
    });
    this.manager.getCustomers().add(td => {
      this.clientiMap = this.manager.clientiMap;
    });
    this.sksForm = this.manager.sksCreateFormInit();
  }

  onFormSubmit(form: NgForm) {
    form["SS_SPK_ID"] = this.selectedPack["SPK_ID"];
    this.manager.sksCreateFormSubmit(form, this.selectedPack);
  }
}
