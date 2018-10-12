import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatricoleApiService } from "../../../services/api-services/matricole-api.service";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { slideInOutAnimation } from "../../../animations";
import { NotificationService } from "../../../services/layout-services/notification.service";

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

  SS_ID = 0;
  // SM_MATRICOLA = '';
  // SM_SS_ID = '';
  // SM_DETTAGLI = '';
  // SM_CREATION_DATE = '';
  // SM_LAST_UPDATE = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: MatricoleApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      this.sksId = fragment;
    });

    this.matricoleCloneForm = this.formBuilder.group({
      SS_ID: [null, Validators.required]
    });
  }

  cloneMatricoleFromSksId(licenseId) {
    this.api.getMatricoleBySks(licenseId).subscribe(matricole => {
      const data = matricole.map(matricola => {
        const resMatr = {};
        resMatr["SM_MATRICOLA"] = matricola["SM_MATRICOLA"];
        resMatr["SM_DETTAGLI"] = matricola["SM_DETTAGLI"];
        resMatr["SM_SS_ID"] = this.sksId;
        return resMatr;
      });
      data.forEach(matricola => {
        console.log(matricola);
        this.api.postMatricola(matricola).subscribe(
          res => {
            this.notificationService.success(
              `matricola ${res["SM_MATRICOLA"]} creata`
            );
          },
          err => {
            console.log(err);
          }
        );
      });
      this.router.navigate(["/matricole", this.sksId]);
    });
  }

  onFormSubmit(form: NgForm) {
    this.cloneMatricoleFromSksId(form["SS_ID"]);
  }
}
