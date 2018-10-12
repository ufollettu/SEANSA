import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SksApiService } from "../../../services/api-services/sks-api.service";
import { slideInOutAnimation } from "../../../animations";
import { ClientiApiService } from "../../../services/api-services/clienti-api.service";
import { RinnoviApiService } from "../../../services/api-services/rinnovi-api.service";
import { NotificationService } from "../../../services/layout-services/notification.service";

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
export class SksRenewComponent implements OnInit {
  sksForm: FormGroup;

  SS_ID = 0;
  SS_KEY = "";
  // SS_OEM = '';
  // SS_ACTIVATION_DATE = '';
  SS_EXPIRE = "";
  // SS_SP_ID = '';
  // SS_SC_ID = '';
  // SS_ACTIVATED_BY = '';
  // SS_ACTIVATION_REFERENT = '';
  // SS_LAST_EDIT = '';

  constructor(
    private notificationeService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: SksApiService,
    private clientiApi: ClientiApiService,
    private rinnoviApi: RinnoviApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getSks(this.route.snapshot.params["id"]);
    this.sksForm = this.formBuilder.group({
      SS_KEY: [null, Validators.required],
      // 'SS_OEM': [null, Validators.required],
      // 'SS_ACTIVATION_DATE': [null],
      SS_EXPIRE: [null, [Validators.required]]
      // 'SS_SP_ID': [null, [Validators.required]],
      // 'SS_SC_ID': [null, [Validators.required]],
      // 'SS_ACTIVATED_BY': [null, Validators.required],
      // 'SS_ACTIVATION_REFERENT': [null, Validators.required],
      // 'SS_LAST_EDIT' : [null]
    });
  }

  getSks(id) {
    this.api.getSks(id).subscribe(data => {
      this.SS_ID = data["SS_ID"];
      this.sksForm.setValue({
        SS_KEY: data["SS_KEY"],
        // SS_OEM: data.SS_OEM,
        // SS_ACTIVATION_DATE: data.SS_ACTIVATION_DATE,
        SS_EXPIRE: data["SS_EXPIRE"]
        // SS_SP_ID: data.SS_SP_ID,
        // SS_SC_ID: data.SS_SC_ID,
        // SS_ACTIVATED_BY: data.SS_ACTIVATED_BY,
        // SS_ACTIVATION_REFERENT: data.SS_ACTIVATION_REFERENT
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateSks(this.SS_ID, form).subscribe(
      res => {
        console.log(res);
        this.insertRinnovo(res["SS_ID"]);
        this.notificationeService.success(
          `Sks key ${res["SS_KEY"]} aggiornata`
        );
        this.router.navigate(["/sks"]);
      },
      err => {
        console.log(err);
      }
    );
  }

  insertRinnovo(sksId) {
    const data = {
      SR_SS_ID: sksId,
      SR_TS: new Date().toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2")
    };
    this.rinnoviApi.postRinnovo(data).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  sksDetails() {
    this.router.navigate(["/sks"]);
  }
}
