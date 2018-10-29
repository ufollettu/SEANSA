import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatricoleApiService } from "../../../services/api-services/matricole-api.service";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";
import { AuthService } from "../../../services/auth-services/auth.service";

@Component({
  selector: "app-matricole-clone",
  templateUrl: "./matricole-clone.component.html",
  styleUrls: ["./matricole-clone.component.css"],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { "[@slideInOutAnimation]": "" }
})
export class MatricoleCloneComponent implements OnInit {
  sksId: any;
  matricoleCloneForm: FormGroup;

  SM_SS_ID = 0;

  constructor(
    private route: ActivatedRoute,
    private dataComponentsManagementService: DataComponentsManagementService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      this.sksId = fragment;
    });

    this.onFormInit();
  }

  onFormInit() {
    this.matricoleCloneForm = this.dataComponentsManagementService.matricoleCloneForm();
  }

  onCloneMatricoleFromSksId(licenseId) {
    this.dataComponentsManagementService.cloneMatricoleFromSksId(
      licenseId,
      this.sksId,
      "/matricole"
    );
  }

  onFormSubmit(form: NgForm) {
    this.onCloneMatricoleFromSksId(form["SS_ID"]);
  }
}
