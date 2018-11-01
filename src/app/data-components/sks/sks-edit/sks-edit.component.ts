import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { slideInOutAnimation } from "../../../animations";
import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";

@Component({
  selector: "app-sks-edit",
  templateUrl: "./sks-edit.component.html",
  styleUrls: ["./sks-edit.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class SksEditComponent implements OnInit, OnDestroy {
  clientiMap = [];
  oems;

  sksForm: FormGroup;

  SS_ID = 0;
  SS_KEY = "";
  SS_OEM = "";
  SS_ACTIVATION_DATE = "";
  SS_EXPIRE = "";
  SS_SP_ID = "";
  SS_SC_ID = "";
  SS_ACTIVATED_BY = "";
  SS_ACTIVATION_REFERENT = "";
  SS_LAST_EDIT = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.oems = this.manager.oems;
    this.sksForm = this.manager.sksEditFormInit();
    this.getSks(this.route.snapshot.params["id"]);
    this.getCustomers();
  }

  getCustomers() {
    const getCust: Subscription = this.manager.getCustomers().add(td => {
      this.clientiMap = this.manager.clientiMap;
    });
    this.manager.subscriptions.push(getCust);
  }

  getSks(id) {
    const getSks: Subscription = this.manager.getSks(id, this.sksForm);
    this.manager.subscriptions.push(getSks);
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.manager.sksEditFormSubmit(
      this.route.snapshot.params["id"],
      form,
      "/sks"
    );
    this.manager.subscriptions.push(submitForm);
  }

  sksDetails() {
    this.router.navigate(["/sks"]);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
