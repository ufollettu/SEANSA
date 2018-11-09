import { ErrorHandlerService } from "./../../../services/shared-services/error-handler.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";

import { levels } from "../roles-levels-data";
import { RolesApiService } from "../../../services/auth-services/roles-api.service";
import { map } from "rxjs/operators";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-roles-edit",
  templateUrl: "./roles-edit.component.html",
  styleUrls: ["./roles-edit.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class RolesEditComponent implements OnInit, OnDestroy {
  keyForm: FormGroup;
  userId;
  permArr;
  levels;
  controls: FormControl[];

  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private api: RolesApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public matcher: ErrorHandlerService,
    private manager: DataComponentsManagementService
  ) {
    this.getPermsArr();
    this.userId = this.route.snapshot.params["id"];
  }

  ngOnInit() {
    this.checkPermArr();
  }

  getPermsArr() {
    const getPerms: Subscription = this.route.data
      .pipe(map(data => data.cres))
      .subscribe(res => {
        this.permArr = res;
      });
    this.manager.subscriptions.push(getPerms);
  }

  checkPermArr() {
    this.levels = levels;
    this.permArr.map((perm, i) => {
      if (perm["UP_P_ID"] === this.levels[perm["UP_P_ID"]]["name"]) {
        this.levels[perm["UP_P_ID"]]["selected"] = true;
      } else {
        this.levels[perm["UP_P_ID"]]["selected"] = false;
      }
      return this.levels;
    });
    this.controls = this.levels.map(c => new FormControl(c.selected));
    this.keyForm = this.formBuilder.group({
      permsLev: new FormArray(this.controls)
    });
  }

  onFormSubmit() {
    const selectedPermName = this.keyForm.value.permsLev
      .map((v, i) => (v ? this.levels[i].name : null))
      .filter(v => v !== null);
    const newPerms = this.mapForDb(selectedPermName);
    const submitForm: Subscription = this.api
      .updateKeys(this.userId, newPerms)
      .subscribe(
        res => {
          this.notificationService.success(
            `permessi utente Id: ${this.userId} modificati`
          );
          this.router.navigate(["/utenti"]);
        },
        err => {
          this.authService.handleLoginError(err);
        }
      );
    this.manager.subscriptions.push(submitForm);
  }

  mapForDb(newPerms) {
    const newKeys = [];
    newPerms.forEach(newPerm => {
      const data = { UP_U_ID: parseInt(this.userId, 0), UP_P_ID: newPerm };
      newKeys.push(data);
    });
    return newKeys;
  }

  ngOnDestroy() {
    this.levels.forEach(level => {
      level["selected"] = false;
    });
    this.manager.unsubAll();
  }
}
