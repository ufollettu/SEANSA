import { MatricoleApiService } from "./../api-services/matricole-api.service";
import { AuthService } from "./../auth-services/auth.service";
import { ClientiApiService } from "./../api-services/clienti-api.service";
import { NotificationService } from "./../layout-services/notification.service";
import { DialogService } from "./../layout-services/dialog.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class DataComponentsManagementService {
  constructor(
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private clientiApi: ClientiApiService,
    private matricoleApi: MatricoleApiService,
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
    return this.clientiApi.getCustomers();
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
    return this.matricoleApi.getMatricoleBySks(sksId);
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
}
