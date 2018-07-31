import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
// import { UtentiApiService } from '../../utenti/utenti-api.service';
import { RolesApiService } from '../roles-api.service';
import { IpService } from '../../ip.service';
import { ErrorStateMatcher } from '@angular/material';
import { UtentiApiService } from '../../utenti/utenti-api.service';

/** Error when invalid control is dirty, touched, or submitted. */
/** TODO copy error matcher in all components */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrls: ['./roles-create.component.css']
})
export class RolesCreateComponent implements OnInit {

  ipAddress: any;
  keyForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  UP_ID: '';
  // UP_U_ID: '';
  UP_P_ID: '';
  SU_UNA: '';
  // SU_LEVEL: '';

  levelControl = new FormControl('', [Validators.required]);
  levels = [
    { name: '0', description: '0 - Creazione nuovo utente' },
    { name: '1', description: '1 - Reset password di qualsiasi utente' },
    { name: '2', description: '2 - Eliminazione di qualsiasi utente' },
    { name: '3', description: '3 - Modifica livello di qualsiasi utente' },
    { name: '4', description: '4 - Rinnovo delle licenze' },
    { name: '5', description: '5 - Gestione completa delle licenze' },
    { name: '6', description: '6 - Gestione completa dei clienti' },
    { name: '7', description: '7 - Gestione completa dei PC' }
  ];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: RolesApiService,
    private userApi: UtentiApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params['id']);
    this.keyForm = this.formBuilder.group({
      'SU_UNA' : [null, Validators.required],
      // 'UP_P_ID': [null, Validators.required]
    });
  }

  getCustomer(id) {
    this.userApi.getUtente(id)
      .subscribe((utente) => {
        console.log(utente);
        this.keyForm.setValue({SU_UNA: utente.SU_UNA});
        // this.api.getKey(utente.SU_ID)
        // .subscribe(key => {
        //   console.log(key);
        //   this.UP_ID = key.UP_ID;
        //   this.keyForm.setValue({
        //     UP_P_ID: key.UP_P_ID,
        //   });
        // });
      });
  }

  onFormSubmit(form: NgForm) {
    console.log(this.UP_ID);
    this.api.updateKey(this.UP_ID, form)
      .subscribe(res => {
        console.log(res);
        alert(`livello utente ${res['UP_U_ID']} modificato`);
        this.router.navigate(['/utenti']);
      }, (err) => {
        console.log(err);
      });
  }

}
