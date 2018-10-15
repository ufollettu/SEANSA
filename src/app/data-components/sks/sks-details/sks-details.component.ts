import { Router } from "@angular/router";
import { PcApiService } from "../../../services/api-services/pc-api.service";
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { oems } from "../sks-oem-data";
import { SksApiService } from "../../../services/api-services/sks-api.service";
import { ClientiApiService } from "../../../services/api-services/clienti-api.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-sks-details",
  templateUrl: "./sks-details.component.html",
  styleUrls: ["./sks-details.component.css"]
})
export class SksDetailsComponent implements OnInit {
  clienti = [];
  pcs = [];
  oems = [];
  sksForm: FormGroup;

  constructor(
    private router: Router,
    private api: SksApiService,
    private clientiApi: ClientiApiService,
    private pcApi: PcApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SksDetailsComponent>
  ) {}

  ngOnInit() {
    this.oems = oems;
    this.pcs = this.data.pcs;
    this.clienti = this.data.clienti.map(cliente => {
      const resClienti = {};
      resClienti["value"] = cliente["SC_ID"];
      resClienti["name"] = cliente["SC_NOME"];
      return resClienti;
    });

    this.sksForm = this.formBuilder.group({
      SS_ID: [null],
      SS_KEY: [null],
      SS_OEM: [null],
      SS_ACTIVATION_DATE: [null],
      SS_EXPIRE: [null],
      SS_CREATED: [null],
      SS_LAST_EDIT: [null],
      SS_MISMATCH_COUNT: [null],
      SS_SP_ID: [null],
      SS_SC_ID: [null],
      SS_STATUS: [null],
      SS_ACTIVATED_BY: [null],
      SS_ACTIVATION_REFERENT: [null]
    });

    this.getSks(this.data.sksId);
  }

  getSks(id) {
    this.api.getSks(id).subscribe(data => {
      this.sksForm.setValue({
        SS_ID: data["SS_ID"],
        SS_KEY: data["SS_KEY"],
        SS_OEM: this.fetchOemsValue(data["SS_OEM"]),
        SS_ACTIVATION_DATE: data["SS_ACTIVATION_DATE"],
        SS_EXPIRE: data["SS_EXPIRE"],
        SS_CREATED: data["SS_CREATED"],
        SS_LAST_EDIT: data["SS_LAST_EDIT"],
        SS_MISMATCH_COUNT: data["SS_MISMATCH_COUNT"],
        SS_SP_ID: this.getPcHwId(data["SS_SP_ID"]),
        SS_SC_ID: this.getCustomerName(data["SS_SC_ID"]),
        SS_STATUS: data["SS_STATUS"] !== 0 ? "abilitata" : "disabilitata",
        SS_ACTIVATED_BY: data["SS_ACTIVATED_BY"],
        SS_ACTIVATION_REFERENT: data["SS_ACTIVATION_REFERENT"]
      });
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  sendMail(sksKey) {
    this.onClose();
    this.router.navigate(["/sks-mailer", sksKey]);
  }

  fetchOemsValue(keyOem) {
    let oemName = "";
    this.oems.forEach(oem => {
      if (keyOem === oem.value) {
        oemName = oem.name;
      }
    });
    return oemName;
  }

  getPcHwId(id) {
    let result = "";
    this.pcs.forEach(pc => {
      if (pc["pcId"] === id) {
        result = pc["hwId"];
      }
    });
    return result;
  }

  getCustomerName(id) {
    let result = "";
    this.clienti.forEach(cliente => {
      if (cliente["value"] === id) {
        result = cliente["name"];
      }
    });
    return result;
  }
}
