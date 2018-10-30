import { ErrorHandlerService } from "./../../../services/shared-services/error-handler.service";
import { PacksApiService } from "../../../services/api-services/packs-api.service";
import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { oems } from "../sks-oem-data";
import { SksApiService } from "../../../services/api-services/sks-api.service";
import { ClientiApiService } from "../../../services/api-services/clienti-api.service";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { ConfirmDialogComponent } from "../../../layout-components/confirm-dialog/confirm-dialog.component";
import { DialogService } from "../../../services/layout-services/dialog.service";
import { AuthService } from "../../../services/auth-services/auth.service";
import { PacksHistoryApiService } from "../../../services/api-services/packs-history-api.service";

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
  clienti = [];
  oems = oems;

  sksForm: FormGroup;
  packs;
  selectedPack;
  isPack: boolean;
  // SS_KEY = '';
  SS_OEM = "";
  // SS_ACTIVATION_DATE = '';
  SS_EXPIRE = "";
  SS_SP_ID = "";
  SS_SPK_ID = "";
  // SS_SC_ID = '';
  // SS_ACTIVATED_BY = '';
  // SS_ACTIVATION_REFERENT = '';
  // SS_LAST_EDIT = '';

  constructor(
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private router: Router,
    private api: SksApiService,
    private packsApiService: PacksApiService,
    private packsHistoryApi: PacksHistoryApiService,
    private clientiApi: ClientiApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    public matcher: ErrorHandlerService
  ) {
    this.isPack = false;
    this.packs = [];
  }

  ngOnInit() {
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
    this.clientiApi.getCustomers().subscribe(clienti => {
      const clientiMap = clienti.map(cliente => {
        const resClienti = {};
        resClienti["value"] = cliente["SC_ID"];
        resClienti["name"] = cliente["SC_NOME"];
        return resClienti;
      });
      // console.log(clientiMap);
      this.clienti = clientiMap;
    });
    this.sksForm = this.formBuilder.group({
      // 'SS_KEY': [null, Validators.required],
      SS_OEM: [null, Validators.required],
      // 'SS_ACTIVATION_DATE': [null],
      SS_EXPIRE: [null, Validators.required],
      // 'SS_SP_ID': [null, [Validators.required]],
      SS_SC_ID: [null, [Validators.required]],
      SS_SPK_ID: [null]
      // 'SS_ACTIVATED_BY': [null, Validators.required],
      // 'SS_ACTIVATION_REFERENT': [null, Validators.required],
      // 'SS_LAST_EDIT' : [null]
    });
  }

  onFormSubmit(form: NgForm) {
    form["SS_SPK_ID"] = this.selectedPack["SPK_ID"];
    this.api.postSks(form).subscribe(
      key => {
        this.packsApiService
          .updatePack(this.selectedPack["SPK_ID"], {
            SPK_USED_SKS_COUNT: this.selectedPack["SPK_USED_SKS_COUNT"] + 1
          })
          .subscribe(
            res => {
              if (this.selectedPack["SPK_ID"] !== undefined) {
                this.notificationService.success(
                  `pack ${this.selectedPack["SPK_ID"]} updated`
                );
              }
            },
            err => {
              this.notificationService.warn(
                `error updating pack id: ${this.selectedPack["SPK_ID"]}`
              );
            }
          );
        this.packsHistoryApi
          .postPack({
            SPKH_SPK_ID: this.selectedPack["SPK_ID"],
            SPKH_SU_ID: this.selectedPack["SPK_SU_OWNER_ID"],
            SPKH_SS_ID: key["SS_ID"],
            SPKH_ACTION: "created"
          })
          .subscribe(
            res => {
              console.log("new history row created");
            },
            err => console.log(err)
          );
        this.dialogService
          .openConfirmDialog(
            `sks key ${key["SS_KEY"]} creata. Vuoi inviarla al Cliente?`
          )
          .afterClosed()
          .subscribe(res => {
            if (res) {
              this.router.navigate(["/sks-mailer", key["SS_KEY"]]);
            } else {
              this.router.navigate(["/sks"]);
            }
          });
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }
}
