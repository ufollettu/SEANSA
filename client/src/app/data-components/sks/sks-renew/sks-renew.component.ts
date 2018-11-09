import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { slideInOutAnimation } from "../../../animations";

@Component({
  selector: "app-sks-renew",
  templateUrl: "./sks-renew.component.html",
  styleUrls: ["./sks-renew.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class SksRenewComponent implements OnInit, OnDestroy {
  sksForm: FormGroup;

  SS_ID = 0;
  SS_KEY = "";
  SS_EXPIRE = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.sksForm = this.manager.sksRenewFormInit();
    this.getSks(this.route.snapshot.params["id"]);
  }

  getSks(id) {
    const getSks: Subscription = this.manager.getSksRenew(id, this.sksForm);
    this.manager.subscriptions.push(getSks);
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.manager.sksRenewFormSubmit(
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
