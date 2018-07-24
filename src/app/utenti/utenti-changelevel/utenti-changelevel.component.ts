import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { UtentiApiService } from '../utenti-api.service';
import { IpService } from '../../ip.service';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
/** TODO copy error matcher in all components */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-utenti-changelevel',
  templateUrl: './utenti-changelevel.component.html',
  styleUrls: ['./utenti-changelevel.component.css']
})
export class UtentiChangelevelComponent implements OnInit {


  ipAddress: any;
  utenteForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  SU_ID: '';
  SU_UNA: '';
  SU_PAW: '';
  SU_LEVEL: '';
  // SU_LAST_LOGIN: '';
  // SU_CREATION: '';
  // SU_LAST_EDIT: '';
  // SU_LAST_IP: '';
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

  constructor(private router: Router, private route: ActivatedRoute, private api: UtentiApiService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.getCustomer(this.route.snapshot.params['id']);
    this.utenteForm = this.formBuilder.group({
      'SU_UNA': [null, Validators.required],
      // 'SU_PAW': [null, Validators.required],
      'SU_LEVEL': this.levelControl,
      // 'SU_LEVEL': [0, Validators.required],
      // 'SU_LAST_LOGIN' : new Date(),
      // 'SU_CREATION': new Date(),
      'SU_LAST_EDIT': new Date(),
      // 'SU_LAST_IP': [null]
    });
  }

  getCustomer(id) {
    this.api.getUtente(id)
      .subscribe(data => {
        this.SU_ID = data.SU_ID;
        this.utenteForm.setValue({
          SU_UNA: data.SU_UNA,
          // SU_PAW: data.SU_PAW,
          SU_LEVEL: data.SU_LEVEL,
          SU_LAST_EDIT: new Date(),
          // SU_LAST_IP: data.SU_LAST_IP
        });
      });
  }

  onFormSubmit(form: NgForm) {
    console.log(this.SU_ID);
    this.api.updateUtente(this.SU_ID, form)
      .subscribe(res => {
        console.log(res);
        alert(`livello utente ${res['SU_UNA']} modificato`);
        this.router.navigate(['/utenti']);
      }, (err) => {
        console.log(err);
      });
  }

}
