import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SksApiService } from '../sks-api.service';
import { slideInOutAnimation } from '../../../animations';

@Component({
  selector: 'app-sks-edit',
  templateUrl: './sks-edit.component.html',
  styleUrls: ['./sks-edit.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class SksEditComponent implements OnInit {

  sksForm: FormGroup;

  SS_ID = '';
  SS_KEY = '';
  SS_OEM = '';
  SS_ACTIVATION_DATE = '';
  SS_EXPIRE = '';
  SS_SP_ID = '';
  SS_SC_ID = '';
  SS_ACTIVATED_BY = '';
  SS_ACTIVATION_REFERENT = '';
  SS_LAST_EDIT = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: SksApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getSks(this.route.snapshot.params['id']);
    this.sksForm = this.formBuilder.group({
      'SS_KEY': [null, Validators.required],
      'SS_OEM': [null, Validators.required],
      'SS_ACTIVATION_DATE': [null],
      'SS_EXPIRE': [null],
      'SS_SP_ID': [null, [Validators.required]],
      'SS_SC_ID': [null, [Validators.required]],
      'SS_ACTIVATED_BY': [null, Validators.required],
      'SS_ACTIVATION_REFERENT': [null, Validators.required],
      // 'SS_LAST_EDIT' : [null]
    });
  }

  getSks(id) {
    this.api.getSks(id)
      .subscribe(data => {
        this.SS_ID = data.SS_ID;
        this.sksForm.setValue({
          SS_KEY: data.SS_KEY,
          SS_OEM: data.SS_OEM,
          SS_ACTIVATION_DATE: data.SS_ACTIVATION_DATE,
          SS_EXPIRE: data.SS_EXPIRE,
          SS_SP_ID: data.SS_SP_ID,
          SS_SC_ID: data.SS_SC_ID,
          SS_ACTIVATED_BY: data.SS_ACTIVATED_BY,
          SS_ACTIVATION_REFERENT: data.SS_ACTIVATION_REFERENT
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateSks(this.SS_ID, form)
      .subscribe(res => {
        console.log(res);
        // const id = res['SC_ID'];
        alert(`Sks key ${res['SS_KEY']} aggiornata`);
        this.router.navigate(['/sks']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  sksDetails() {
    this.router.navigate(['/sks']);
  }

}
