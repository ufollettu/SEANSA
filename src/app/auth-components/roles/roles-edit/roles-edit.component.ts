import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl,
  FormGroupDirective,
  FormArray
} from "@angular/forms";

import { RolesApiService } from "../roles-api.service";
import { ErrorStateMatcher } from "@angular/material";
import { map } from 'rxjs/operators';
import { slideInOutAnimation } from "../../../animations";


/** Error when invalid control is dirty, touched, or submitted. */
/** TODO copy error matcher in all components */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class RolesEditComponent implements OnInit {

  keyForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  userId;
  permArr = [];

  levelControl = new FormControl("", [Validators.required]);
  levels = [
    { name: 0, selected: false, description: "Creazione nuovo utente" },
    { name: 1, selected: false, description: "Reset password di qualsiasi utente" },
    { name: 2, selected: false, description: "Eliminazione di qualsiasi utente" },
    { name: 3, selected: false, description: "Modifica livello di qualsiasi utente" },
    { name: 4, selected: false, description: "Rinnovo delle licenze" },
    { name: 5, selected: false, description: "Gestione completa delle licenze" },
    { name: 6, selected: false, description: "Gestione completa dei clienti" },
    { name: 7, selected: false, description: "Gestione completa dei PC" }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: RolesApiService,
    private formBuilder: FormBuilder,
  ) {
    this.route.data.pipe(
      map(data => data.cres)).subscribe((res) => {
        this.permArr = res;
        console.log(this.permArr);
      });
    this.checkPermArr();
    this.userId = this.route.snapshot.params['id'];
  }


  ngOnInit() {
    // Create a new array with a form control for each order
    const controls = this.levels.map(c => new FormControl(c.selected));
    this.keyForm = this.formBuilder.group({
      permsLev: new FormArray(controls)
    });
  }

  checkPermArr() {
    this.permArr.forEach(perm => {
      this.levels.forEach(level => {
        if (perm.UP_P_ID === level.name) {
          level.selected = true;
        }
      });
    });
  }

  onFormSubmit() {
    const selectedPermName = this.keyForm.value.permsLev
      .map((v, i) => v ? this.levels[i].name : null)
      .filter(v => v !== null);
    // console.log(selectedPermName);
    const newPerms = this.mapForDb(selectedPermName);
    // console.log(newPerms);
    this.api.updateKeys(this.userId, newPerms)
      .subscribe(res => {
        console.log(res);
        alert(`permessi utente Id: ${this.userId} modificati`);
        this.router.navigate(['/utenti']);
      });
  }

  mapForDb(newPerms) {
    const newKeys = [];
    newPerms.forEach(newPerm => {
      const data = { UP_U_ID: parseInt(this.userId, 0), UP_P_ID: newPerm };
      newKeys.push(data);
    });
    return newKeys;
  }
}
