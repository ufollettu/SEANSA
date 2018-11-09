import { Subscription } from "rxjs";
import { UploadFileService } from "./../api-services/upload.service";
import { RolesApiService } from "./../auth-services/roles-api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { RinnoviApiService } from "./../api-services/rinnovi-api.service";
import { PacksHistory } from "./../../models/packs-history";
import { Rinnovo } from "./../../models/rinnovo";
import { Cliente } from "./../../models/cliente";
import { Pc } from "./../../models/pc";
import { Sks } from "./../../models/sks";
import { Matricola } from "./../../models/matricola";
import { Utente } from "./../../models/utente";
import { Packs } from "./../../models/packs";
import { map } from "rxjs/operators";
import { SksApiService } from "./../api-services/sks-api.service";
import { PcApiService } from "./../api-services/pc-api.service";
import { UtentiApiService } from "./../api-services/utenti-api.service";
import { PacksHistoryApiService } from "./../api-services/packs-history-api.service";
import { MatricoleApiService } from "./../api-services/matricole-api.service";
import { AuthService } from "./../auth-services/auth.service";
import { ClientiApiService } from "./../api-services/clienti-api.service";
import { NotificationService } from "./../layout-services/notification.service";
import { DialogService } from "./../layout-services/dialog.service";
import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { PacksApiService } from "../api-services/packs-api.service";
import { oems } from "src/app/data-components/sks/sks-oem-data";

@Injectable({
  providedIn: "root"
})
export class DataComponentsManagementService implements OnDestroy {
  subscriptions: Subscription[];
  clienti: Cliente[];
  clientiMap: {}[];
  utenti: Utente[];
  sks: Sks[];
  matricole: Matricola[];
  serials: {};
  rinnovi: Rinnovo[];
  rinnoviObj: {};
  pcs: Pc[];
  pcsObjArr: object[];
  packs: Packs[];
  packsHistory: PacksHistory[];
  oems;

  constructor(
    private clientiApi: ClientiApiService,
    private utentiApi: UtentiApiService,
    private sksApi: SksApiService,
    private matricoleApi: MatricoleApiService,
    private rinnoviApi: RinnoviApiService,
    private pcsApi: PcApiService,
    private packsApi: PacksApiService,
    private packsHistoryApi: PacksHistoryApiService,
    private uploadApi: UploadFileService,
    private rolesApi: RolesApiService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.oems = oems;
    this.subscriptions = [];
  }

  noData(data) {
    if (data.length === 0) {
      this.notificationService.noData();
    }
  }

  /* Customer Management */

  clientiFormInit() {
    return this.formBuilder.group({
      SC_NOME: [null, Validators.required],
      SC_PIVA: [null],
      SC_COD_FISCALE: [null],
      SC_INDIRIZZO: [null, Validators.required],
      SC_EMAIL: [null, [Validators.required, Validators.email]],
      SC_TELEFONO: [null],
      SC_REFERENTE_NOME: [null, Validators.required],
      SC_TEL_REFERENTE: [null, Validators.required]
      // 'SC_TS' : [null]
    });
  }

  getCustomers() {
    return this.clientiApi.getCustomers().subscribe(clienti => {
      this.clienti = clienti;
      const clientiMap = clienti.map(cliente => {
        const resClienti = {};
        resClienti["value"] = cliente["SC_ID"];
        resClienti["name"] = cliente["SC_NOME"];
        return resClienti;
      });
      this.clientiMap = clientiMap;
    });
  }

  getCustomer(id, form) {
    return this.clientiApi.getCustomer(id).subscribe(data => {
      // this.SC_ID = data["SC_ID"];
      form.setValue({
        SC_NOME: data["SC_NOME"],
        SC_PIVA: data["SC_PIVA"],
        SC_COD_FISCALE: data["SC_COD_FISCALE"],
        SC_INDIRIZZO: data["SC_INDIRIZZO"],
        SC_EMAIL: data["SC_EMAIL"],
        SC_TELEFONO: data["SC_TELEFONO"],
        SC_REFERENTE_NOME: data["SC_REFERENTE_NOME"],
        SC_TEL_REFERENTE: data["SC_TEL_REFERENTE"]
      });
    });
  }

  postCustomerFormSubmit(form, destUrl) {
    return this.clientiApi.postCustomer(form).subscribe(
      res => {
        this.notificationService.success(`cliente ${res["SC_NOME"]} creato`);
        this.router.navigate([destUrl]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  updateCustomer(id, form, destUrl) {
    return this.clientiApi.updateCustomer(id, form).subscribe(
      res => {
        this.notificationService.success(
          `cliente ${res["SC_NOME"]} aggiornato`
        );
        this.router.navigate([destUrl]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  // getCustomerName(id) {
  //   let result = "";
  //   this.clienti.forEach(cliente => {
  //     if (cliente["SC_ID"] === id) {
  //       result = cliente["SC_NOME"];
  //     }
  //   });
  //   return result;
  // }

  /* Matricole Management */

  matricoleFormInit(sksId) {
    return this.formBuilder.group({
      SM_MATRICOLA: [null, Validators.required],
      SM_SS_ID: [sksId],
      SM_DETTAGLI: [null],
      SM_CREATION_DATE: new Date(),
      SM_LAST_UPDATE: new Date()
    });
  }

  matricoleCloneForm() {
    return this.formBuilder.group({
      SS_ID: [null, Validators.required]
    });
  }

  // fetchMatricole() {
  //   return this.matricoleApi.getMatricole().subscribe(matricole => {
  //     const matricoleCount = matricole
  //       .map(matricola => {
  //         return matricola["SM_SS_ID"];
  //       })
  //       .reduce((allIds, id) => {
  //         if (id in allIds) {
  //           allIds[id]++;
  //         } else {
  //           allIds[id] = 1;
  //         }
  //         return allIds;
  //       }, {});
  //     this.serials = matricoleCount;
  //   });
  // }

  postMatricola(form, sksId, destUrl) {
    return this.matricoleApi.postMatricola(form).subscribe(
      res => {
        this.notificationService.success(
          `matricola ${res["SM_MATRICOLA"]} creata`
        );
        this.router.navigate([destUrl, sksId]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  cloneMatricoleFromSksId(licenseId, sksId, destUrl) {
    return this.matricoleApi
      .getMatricoleBySks(licenseId)
      .subscribe(matricole => {
        const data = matricole.map(matricola => {
          const resMatr = {};
          resMatr["SM_MATRICOLA"] = matricola["SM_MATRICOLA"];
          resMatr["SM_DETTAGLI"] = matricola["SM_DETTAGLI"];
          resMatr["SM_SS_ID"] = sksId;
          return resMatr;
        });
        data.forEach(matricola => {
          this.matricoleApi.postMatricola(matricola).subscribe(
            res => {
              this.notificationService.success(
                `matricola ${res["SM_MATRICOLA"]} creata`
              );
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        });
        this.router.navigate([destUrl, sksId]);
      });
  }

  /* Packs Management */

  getPack(id, form) {
    return this.packsApi.getPack(id).subscribe(pack => {
      // this.SPK_ID = pack['SPK_ID'];
      form.patchValue({
        SPK_SU_CREATOR_ID: pack["SPK_SU_CREATOR_ID"],
        SPK_SU_OWNER_ID: pack["SPK_SU_OWNER_ID"],
        SPK_EXPIRE: pack["SPK_EXPIRE"],
        SPK_SKS_COUNT: pack["SPK_SKS_COUNT"]
      });
    });
  }

  packsFormInit() {
    return this.formBuilder.group({
      SPK_SU_CREATOR_ID: [null],
      SPK_SU_OWNER_ID: [null, Validators.required],
      SPK_EXPIRE: [null, Validators.required],
      SPK_SKS_COUNT: [null, Validators.required]
    });
  }

  postPack(form, destUrl) {
    return this.packsApi.postPack(form).subscribe(
      pack => {
        this.packsHistoryApi
          .postPack({
            SPKH_SPK_ID: pack["SPK_ID"],
            SPKH_SU_ID: pack["SPK_SU_OWNER_ID"],
            SPKH_ACTION: "pack created"
          })
          .subscribe(
            res => {
              console.log("new history row created");
            },
            err => console.log(err)
          );
        this.notificationService.success(`pack id: ${pack["SPK_ID"]} creato`);
        this.router.navigate([destUrl]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  updatePack(id, form, destUrl) {
    return this.packsApi.updatePack(id, form).subscribe(
      pack => {
        this.packsHistoryApi
          .postPack({
            SPKH_SPK_ID: pack["SPK_ID"],
            SPKH_SU_ID: pack["SPK_SU_OWNER_ID"],
            SPKH_ACTION: "pack updated"
          })
          .subscribe(
            res => {
              console.log("new history row created");
            },
            err => console.log(err)
          );
        this.notificationService.success(
          `pack id: ${pack["SPK_ID"]} aggiornato`
        );
        this.router.navigate([destUrl]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  /* Packs-History Management */

  /* Pc Management */

  // fetchPcs() {
  //   return this.pcsApi.getPcs().subscribe(
  //     pcs => {
  //       this.pcs = pcs;
  //       const pcsCount = pcs.map(pc => {
  //         const pcRes = {};
  //         pcRes["pcId"] = pc["SP_ID"];
  //         pcRes["hwId"] = pc["SP_HW_ID"];
  //         pcRes["lastConnection"] = pc["SP_LAST_RX"];
  //         return pcRes;
  //       });
  //       this.pcsObjArr = pcsCount;
  //     },
  //     err => {
  //       this.authService.handleLoginError(err);
  //     }
  //   );
  // }

  banPc(id: number) {
    const status = 1;
    return this.pcsApi.updatePc(id, { SP_STATUS: status }).subscribe(
      res => {
        this.notificationService.warn(`pc ${res["SP_HW_ID"]} bannato`);
        // this.refreshPcsList();
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  unbanPc(id: number) {
    const status = 0;
    return this.pcsApi.updatePc(id, { SP_STATUS: status }).subscribe(
      res => {
        this.notificationService.success(`pc ${res["SP_HW_ID"]} sbannato`);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  // getPcHwId(id) {
  //   let result = "";
  //   this.pcs.forEach(pc => {
  //     if (pc["SP_ID"] === id) {
  //       result = pc["SP_HW_ID"];
  //     }
  //   });
  //   return result;
  // }

  // getPcLastConnection(id) {
  //   let result;
  //   this.pcs.forEach(pc => {
  //     if (pc["SP_ID"] === id) {
  //       result = pc["SP_LAST_RX"];
  //     }
  //   });
  //   return result;
  // }

  /* Rinnovi Management */

  insertRinnovo(sksId, destUrl) {
    const data = {
      SR_SS_ID: sksId,
      SR_TS: new Date().toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2")
    };
    return this.rinnoviApi.postRinnovo(data).subscribe(
      res => {
        this.notificationService.success(`Sks key ${res["SS_KEY"]} aggiornata`);
        this.router.navigate([destUrl]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  /* Sks Management */

  fetchOemsValue(keyOem) {
    let oemName = "";
    this.oems.forEach(oem => {
      if (keyOem === oem.value) {
        oemName = oem.name;
      }
    });
    return oemName;
  }

  sksCreateFormInit() {
    return this.formBuilder.group({
      SS_OEM: [null, Validators.required],
      SS_EXPIRE: [null, Validators.required],
      SS_SC_ID: [null, [Validators.required]],
      SS_SPK_ID: [null]
    });
  }

  sksEditFormInit() {
    return this.formBuilder.group({
      SS_KEY: [null, Validators.required],
      SS_OEM: [null, Validators.required],
      SS_ACTIVATION_DATE: [null],
      SS_EXPIRE: [null],
      SS_SP_ID: [null, [Validators.required]],
      SS_SC_ID: [null, [Validators.required]],
      SS_ACTIVATED_BY: [null, Validators.required],
      SS_ACTIVATION_REFERENT: [null, Validators.required]
    });
  }

  sksFormInit() {
    return this.formBuilder.group({
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
  }

  sksRenewFormInit() {
    return this.formBuilder.group({
      SS_KEY: [null, Validators.required],
      SS_EXPIRE: [null, [Validators.required]]
    });
  }

  sksSendMailFormInit() {
    return this.formBuilder.group({
      sks: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      message: [null]
    });
  }

  patchMailerFormValue(sksId, form) {
    form.patchValue({
      sks: sksId
    });
  }

  getSks(id, form) {
    return this.sksApi.getSks(id).subscribe(data => {
      form.setValue({
        SS_KEY: data["SS_KEY"],
        SS_OEM: data["SS_OEM"],
        SS_ACTIVATION_DATE: data["SS_ACTIVATION_DATE"],
        SS_EXPIRE: data["SS_EXPIRE"],
        SS_SP_ID: data["SS_SP_ID"],
        SS_SC_ID: data["SS_SC_ID"],
        SS_ACTIVATED_BY: data["SS_ACTIVATED_BY"],
        SS_ACTIVATION_REFERENT: data["SS_ACTIVATION_REFERENT"]
      });
    });
  }

  getSksRenew(id, form) {
    return this.sksApi.getSks(id).subscribe(data => {
      form.setValue({
        SS_KEY: data["SS_KEY"],
        SS_EXPIRE: data["SS_EXPIRE"]
      });
    });
  }

  getSksDetails(id, pcHwId, customerName, oem, form) {
    return this.sksApi.getSks(id).subscribe(data => {
      form.setValue({
        SS_ID: data["SS_ID"],
        SS_KEY: data["SS_KEY"],
        SS_OEM: oem,
        SS_ACTIVATION_DATE: data["SS_ACTIVATION_DATE"],
        SS_EXPIRE: data["SS_EXPIRE"],
        SS_CREATED: data["SS_CREATED"],
        SS_LAST_EDIT: data["SS_LAST_EDIT"],
        SS_MISMATCH_COUNT: data["SS_MISMATCH_COUNT"],
        SS_SP_ID: pcHwId,
        SS_SC_ID: customerName,
        SS_STATUS: data["SS_STATUS"] !== 0 ? "abilitata" : "disabilitata",
        SS_ACTIVATED_BY: data["SS_ACTIVATED_BY"],
        SS_ACTIVATION_REFERENT: data["SS_ACTIVATION_REFERENT"]
      });
    });
  }

  decouplePC(id) {
    const status = 1;
    return this.sksApi.getSks(id).subscribe(
      key => {
        if (key["SS_SP_ID"] === 0) {
          this.notificationService.warn(
            `non ci sono pc associati a questa chiave`
          );
        } else {
          this.sksApi
            .updateSks(id, { SS_SP_ID: "", SS_STATUS: status })
            .subscribe(res => {
              this.notificationService.success(
                `chiave ${res["SS_KEY"]} disassociata`
              );
              // this.refreshSkssList();
            });
        }
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  disableSks(id) {
    const status = 0;
    return this.sksApi.updateSks(id, { SS_STATUS: status }).subscribe(
      res => {
        this.notificationService.warn(`chiave ${res["SS_KEY"]} disabilitata`);
        // this.refreshSkssList();
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  enableSks(id) {
    const status = 1;
    return this.sksApi.updateSks(id, { SS_STATUS: status }).subscribe(
      res => {
        this.notificationService.success(`chiave ${res["SS_KEY"]} abilitata`);
        // this.refreshSkssList();
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  deleteSks(id) {
    return this.dialogService
      .openConfirmDialog(`sei sicuro?`)
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const status = -1;
          this.sksApi.updateSks(id, { SS_STATUS: status }).subscribe(
            key => {
              this.packsApi.getPack(key["SS_SPK_ID"]).subscribe(pack => {
                this.packsApi
                  .updatePack(key["SS_SPK_ID"], {
                    SPK_USED_SKS_COUNT: pack["SPK_USED_SKS_COUNT"] - 1
                  })
                  .subscribe(updatedPack => {
                    this.notificationService.warn(
                      `chiave ${key["SS_KEY"]} eliminata`
                    );
                    // this.refreshSkssList();
                  });
                this.packsHistoryApi
                  .postPack({
                    SPKH_SPK_ID: pack["SPK_ID"],
                    SPKH_SU_ID: pack["SPK_SU_OWNER_ID"],
                    SPKH_SS_ID: key["SS_ID"],
                    SPKH_ACTION: "sks deleted"
                  })
                  .subscribe(history => {
                    console.log("new history row created");
                  });
              });
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
  }

  sksCreateFormSubmit(form, selectedPack) {
    return this.sksApi.postSks(form).subscribe(
      key => {
        this.packsApi
          .updatePack(selectedPack["SPK_ID"], {
            SPK_USED_SKS_COUNT: selectedPack["SPK_USED_SKS_COUNT"] + 1
          })
          .subscribe(
            res => {
              if (selectedPack["SPK_ID"] !== undefined) {
                this.notificationService.success(
                  `pack ${selectedPack["SPK_ID"]} updated`
                );
              }
            },
            err => {
              this.notificationService.warn(
                `error updating pack id: ${selectedPack["SPK_ID"]}`
              );
            }
          );
        this.packsHistoryApi
          .postPack({
            SPKH_SPK_ID: selectedPack["SPK_ID"],
            SPKH_SU_ID: selectedPack["SPK_SU_OWNER_ID"],
            SPKH_SS_ID: key["SS_ID"],
            SPKH_ACTION: "sks created"
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

  sksEditFormSubmit(id, form, destUrl) {
    return this.sksApi.updateSks(id, form).subscribe(
      res => {
        this.notificationService.success(`Sks key ${res["SS_KEY"]} aggiornata`);
        this.router.navigate([destUrl]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  sksRenewFormSubmit(id, form, destUrl) {
    return this.sksApi.updateSks(id, form).subscribe(
      res => {
        this.insertRinnovo(res["SS_ID"], destUrl);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  sksSendMailFormSubmit(form) {
    return this.sksApi.sendEmail(form).subscribe(
      res => {
        console.log(res);
        if (res.responseCode === 535) {
          this.notificationService.warn(
            "error in mail account, please contact helpdesk"
          );
        } else {
          this.notificationService.success("mail correctly sent to " + res[0]);
          this.router.navigate(["/sks"]);
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            this.notificationService.warn("sks does not exists");
            this.router.navigate(["/sks-mailer"]);
          }
        }
        this.authService.handleLoginError(err);
      }
    );
  }

  /* Utenti Management */

  usersFormInit() {
    return this.formBuilder.group({
      SU_UNA: [null, Validators.required],
      SU_PAW: [null, Validators.required],
      SU_LEVEL: [0],
      SU_LAST_LOGIN: new Date(),
      SU_CREATION: new Date(),
      SU_LAST_EDIT: new Date(),
      SU_LAST_IP: [null]
    });
  }

  usersFormSubmit(form, destUrl) {
    return this.utentiApi.postUtente(form).subscribe(
      res => {
        const id = res["SU_ID"];
        const data = { UP_U_ID: res["SU_ID"], UP_P_ID: 4 };
        this.rolesApi.postKey(data).subscribe(r => {
          console.log(r);
        });
        this.uploadApi.postCustomization(id).subscribe(s => {
          console.log(s);
        });
        this.notificationService.success(`utente ${res["SU_UNA"]} creato`);
        this.router.navigate([destUrl]);

      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            this.notificationService.warn(
              "username exists or was previously deleted"
            );
          }
          // this.authService.handleLoginError(err);
        }
      }
    );
  }

  // getUtenti() {
  //   return this.utentiApi.getUtenti().subscribe(
  //     utenti => {
  //       this.utenti = utenti;
  //       // this.refreshPacksList();
  //     },
  //     err => {
  //       this.authService.handleLoginError(err);
  //     }
  //   );
  // }

  getUser(id, form) {
    return this.utentiApi.getUtente(id).subscribe(data => {
      form.setValue({
        SU_UNA: data["SU_UNA"],
        SU_PAW: null,
        SU_LAST_EDIT: new Date()
      });
    });
  }

  resetPwdFormInit() {
    return this.formBuilder.group({
      SU_UNA: [null, Validators.required],
      SU_PAW: [null, Validators.required],
      SU_LAST_EDIT: new Date()
    });
  }

  resetPwdFormSubmit(id, form, destUrl) {
    return this.utentiApi.updateUtente(id, form).subscribe(
      res => {
        this.notificationService.success(
          `password utente ${res["SU_UNA"]} aggiornata`
        );
        this.router.navigate([destUrl]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  // mapUtenti() {
  //   return this.utenti.map(utente => {
  //     const resUtenti = {};
  //     resUtenti["value"] = utente["SU_ID"];
  //     resUtenti["name"] = utente["SU_UNA"];
  //     return resUtenti;
  //   });
  // }

  // getUserName(id) {
  //   let result = "";
  //   this.utenti.forEach(utente => {
  //     if (utente["SU_ID"] === id) {
  //       result = utente["SU_UNA"];
  //     }
  //   });
  //   return result;
  // }

  unsubAll() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
        console.log(`unsubscribe ${sub['destination']['destination']['closed']}`);
      });
    }
  }

  /* On Destroy */
  ngOnDestroy(): void {
    console.log("service destroyed");
  }
}
