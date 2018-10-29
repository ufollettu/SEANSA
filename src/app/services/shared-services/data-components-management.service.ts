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

@Injectable({
  providedIn: "root"
})
export class DataComponentsManagementService implements OnDestroy {
  clienti: Cliente[];
  utenti: Utente[];
  sks: Sks[];
  matricole: Matricola[];
  rinnovi: Rinnovo[];
  pcs: Pc[];
  packs: Packs[];
  packHistory: PacksHistory[];

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
  ) {}

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
    return this.packsApi.getPacks();
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

  /* Utenti Management */

  getUtenti() {
    return this.utentiApi.getUtenti();
  }

  ngOnDestroy(): void {
    console.log("service destroyed");
  }
}
