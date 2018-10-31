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
  clienti: Cliente[];
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
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.oems = oems;
  }

  noData(data) {
    if (data.length === 0) {
      this.notificationService.noData();
    }
  }

  /* Customer Management */

  refreshCustomersList() {
    return this.clientiApi.getCustomers().subscribe(
      res => {
        this.clienti = res;
        this.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

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

  getCustomer(id, form) {
    this.clientiApi.getCustomer(id).subscribe(data => {
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

  postCustomer(form, destUrl) {
    this.clientiApi.postCustomer(form).subscribe(
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
    this.clientiApi.updateCustomer(id, form).subscribe(
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

  getCustomerName(id) {
    let result = "";
    this.clienti.forEach(cliente => {
      if (cliente["SC_ID"] === id) {
        result = cliente["SC_NOME"];
      }
    });
    return result;
  }

  deleteCustomer(id: number) {
    return this.dialogService
      .openConfirmDialog("sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          const deleted = 1;
          this.clientiApi.updateCustomer(id, { SC_DELETED: deleted }).subscribe(
            cust => {
              this.notificationService.warn(
                `cliente ${cust["SC_NOME"]} rimosso`
              );
              // this.refreshCustomersList();
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
  }

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

  getMatricoleBySks(sksId) {
    return this.matricoleApi.getMatricoleBySks(sksId).subscribe(
      res => {
        this.matricole = res;
        this.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  fetchMatricole() {
    return this.matricoleApi.getMatricole().subscribe(matricole => {
      const matricoleCount = matricole
        .map(matricola => {
          return matricola["SM_SS_ID"];
        })
        .reduce((allIds, id) => {
          if (id in allIds) {
            allIds[id]++;
          } else {
            allIds[id] = 1;
          }
          return allIds;
        }, {});
      this.serials = matricoleCount;
    });
  }

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
    this.matricoleApi.getMatricoleBySks(licenseId).subscribe(matricole => {
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

  deleteMatricola(id) {
    return this.dialogService
      .openConfirmDialog("Sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.matricoleApi.deleteMatricola(id).subscribe(
            matr => {
              this.notificationService.warn(`Matricola ${id} rimossa`);
              // this.refreshMatricoleList();
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
  }

  /* Packs Management */

  refreshPacksList() {
    return this.packsApi.getPacks().subscribe(
      res => {
        this.mapPacks(res);
        this.packs = res;

        this.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  mapPacks(packs: Packs[]) {
    packs.map(pack => {
      pack["ownerUsername"] = this.getUserName(pack["SPK_SU_OWNER_ID"]);
      pack["creatorUsername"] = this.getUserName(pack["SPK_SU_CREATOR_ID"]);
      return pack;
    });
  }

  getPack(id, form) {
    this.packsApi.getPack(id).subscribe(pack => {
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
    this.packsApi.postPack(form).subscribe(
      pack => {
        this.notificationService.success(`pack id: ${pack["SPK_ID"]} creato`);
        this.router.navigate([destUrl]);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  updatePack(id, form, destUrl) {
    this.packsApi.updatePack(id, form).subscribe(
      pack => {
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

  deletePack(id: number) {
    return this.dialogService
      .openConfirmDialog("sei sicuro?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.packsApi.deletePack(id).subscribe(
            pack => {
              this.notificationService.warn(`pacchetto rimosso`);
            },
            err => {
              this.authService.handleLoginError(err);
            }
          );
        }
      });
  }
  /* Packs-History Management */

  refreshPacksHistoryList() {
    return this.packsHistoryApi.getPacks().subscribe(
      res => {
        this.mapPacksHistory(res);
        this.packsHistory = res;

        this.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  mapPacksHistory(packsHistory: PacksHistory[]) {
    packsHistory.map(ph => {
      ph["username"] = this.getUserName(ph["SPKH_SU_ID"]);
      return ph;
    });
  }

  /* Pc Management */

  refershPcList() {
    return this.pcsApi.getPcs().subscribe(
      res => {
        this.mapPcs(res);
        this.pcs = res;

        this.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  fetchPcs() {
    return this.pcsApi.getPcs().subscribe(
      pcs => {
        const pcsCount = pcs.map(pc => {
          const pcRes = {};
          pcRes["pcId"] = pc["SP_ID"];
          pcRes["hwId"] = pc["SP_HW_ID"];
          pcRes["lastConnection"] = pc["SP_LAST_RX"];
          return pcRes;
        });
        this.pcsObjArr = pcsCount;
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  mapPcs(pcs: Pc[]) {
    pcs.map(pc => {
      pc["statusDescription"] = pc["SP_STATUS"] ? "bannato" : "non bannato";
      return pc;
    });
  }

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

  getPcHwId(id) {
    let result = "";
    this.pcs.forEach(pc => {
      if (pc["SP_ID"] === id) {
        result = pc["SP_HW_ID"];
      }
    });
    return result;
  }

  getPcLastConnection(id) {
    let result;
    this.pcs.forEach(pc => {
      if (pc["SP_ID"] === id) {
        result = pc["SP_LAST_RX"];
      }
    });
    return result;
  }

  /* Rinnovi Management */

  refreshRinnoviList() {
    return this.rinnoviApi.getRinnovi().subscribe(
      res => {
        this.rinnovi = res;
        this.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  fetchRinnovi() {
    return this.rinnoviApi.getRinnovi().subscribe(
      rinnovi => {
        if (Object.keys(rinnovi).length > 0) {
          const rinnoviCount = rinnovi
            .map(rinnovo => {
              return rinnovo["Chiave"];
            })
            .reduce((allIds, id) => {
              if (id in allIds) {
                allIds[id]++;
              } else {
                allIds[id] = 1;
              }
              return allIds;
            }, {});
          this.rinnoviObj = rinnoviCount;
        }
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  /* Sks Management */

  refreshSkssList() {
    // this.fetchRinnovi();
    // this.refershPcList();
    // this.getMatricole();
    // this.refreshCustomersList();
    return this.sksApi.getSkss().subscribe(
      res => {
        // add field useful to search bar in sks array
        this.mapSks(res);
        this.sks = res;

        this.noData(res);
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  mapSks(sks: Sks[]) {
    sks.map(sk => {
      sk["sksPcHwId"] = this.getPcHwId(sk["SS_SP_ID"]);
      sk["sksPcLastConnection"] = this.getPcLastConnection(sk["SS_SP_ID"]);
      sk["sksCustomerName"] = this.getCustomerName(sk["SS_SC_ID"]);
      sk["sksOems"] = this.fetchOemsValue(sk["SS_OEM"]);
      sk["sksStatus"] = sk["SS_STATUS"] ? "abilitata" : "disabilitata";

      return sk;
    });
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

  getSksDetails(id, pcHwId, customerName, oem, form) {
    this.sksApi.getSks(id).subscribe(data => {
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
                    SPKH_ACTION: "deleted"
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

  /* Utenti Management */

  getUtenti() {
    return this.utentiApi.getUtenti().subscribe(
      utenti => {
        this.utenti = utenti;
        // this.refreshPacksList();
      },
      err => {
        this.authService.handleLoginError(err);
      }
    );
  }

  mapUtenti() {
    return this.utenti.map(utente => {
      const resUtenti = {};
      resUtenti["value"] = utente["SU_ID"];
      resUtenti["name"] = utente["SU_UNA"];
      return resUtenti;
    });
  }

  getUserName(id) {
    let result = "";
    this.utenti.forEach(utente => {
      if (utente["SU_ID"] === id) {
        result = utente["SU_UNA"];
      }
    });
    return result;
  }

  ngOnDestroy(): void {
    console.log("service destroyed");
  }
}
