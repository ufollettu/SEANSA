import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { slideInOutAnimation } from "../../../animations";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { UtentiApiService } from "src/app/services/api-services/utenti-api.service";
import { AuthService } from "src/app/services/auth-services/auth.service";

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
export class PacksEditComponent implements OnInit, OnDestroy {
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
    private utentiApi: UtentiApiService,
    private authService: AuthService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.fetchUtenti();
    this.onFormInit();
  }

  onFormInit() {
    this.packForm = this.manager.packsFormInit();
    this.getPack();
  }

  getPack() {
    const getPack: Subscription = this.manager.getPack(
      this.route.snapshot.params["id"],
      this.packForm
    );
    this.manager.subscriptions.push(getPack);
  }

  fetchUtenti() {
    const fetchUser: Subscription = this.utentiApi.getUtenti().subscribe(
      utenti => {
        this.utenti = this.mapUtenti(utenti);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
    this.manager.subscriptions.push(fetchUser);
  }

  mapUtenti(utenti) {
    return utenti.map(utente => {
      const resUtenti = {};
      resUtenti["value"] = utente["SU_ID"];
      resUtenti["name"] = utente["SU_UNA"];
      return resUtenti;
    });
  }

  onFormSubmit(form: NgForm) {
    const submitForm: Subscription = this.manager.updatePack(
      this.route.snapshot.params["id"],
      form,
      "/packs"
    );
    this.manager.subscriptions.push(submitForm);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
