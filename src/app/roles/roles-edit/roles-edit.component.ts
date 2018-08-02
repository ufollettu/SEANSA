import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl,
  FormGroupDirective
} from "@angular/forms";
// import { UtentiApiService } from '../../utenti/utenti-api.service';
import { RolesApiService } from "../roles-api.service";
import { ErrorStateMatcher } from "@angular/material";
import { map } from 'rxjs/operators';


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
  styleUrls: ['./roles-edit.component.css']
})
export class RolesEditComponent implements OnInit {

  keyForm: FormGroup;
  matcher = new MyErrorStateMatcher();

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
    private api: RolesApiService,
    private formBuilder: FormBuilder,
  ) {
    this.route.data.pipe(
      map(data => data.cres)).subscribe((res) => {
      this.permArr = res;
      console.log(this.permArr);
    });
  }


  ngOnInit() {
    this.keyForm = this.formBuilder.group({
      SU_UNA: [null, Validators.required]
    });
    this.checkPermArr();
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

  // onFormSubmit(form: NgForm) {
  //   console.log(this.UP_ID);
  //   this.api.updateKey(this.UP_ID, form)
  //     .subscribe(res => {
  //       console.log(res);
  //       alert(`livello utente ${res['UP_U_ID']} modificato`);
  //       this.router.navigate(['/utenti']);
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
}
