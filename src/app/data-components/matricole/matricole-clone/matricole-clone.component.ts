import { ErrorHandlerService } from "src/app/services/shared-services/error-handler.service";
import { DataComponentsManagementService } from "./../../../services/shared-services/data-components-management.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";

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
    private manager: DataComponentsManagementService,
    public matcher: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      this.sksId = fragment;
    });

    this.onFormInit();
  }

  onFormInit() {
    this.matricoleCloneForm = this.manager.matricoleCloneForm();
  }

  onCloneMatricoleFromSksId(licenseId) {
    this.manager.cloneMatricoleFromSksId(licenseId, this.sksId, "/matricole");
  }

  onFormSubmit(form: NgForm) {
    this.onCloneMatricoleFromSksId(form["SS_ID"]);
  }
}
