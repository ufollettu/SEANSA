import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SksApiService } from '../sks-api.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sks-create',
  templateUrl: './sks-create.component.html',
  styleUrls: ['./sks-create.component.css']
})
export class SksCreateComponent implements OnInit {

  // TODO crete function to hash sks key and put in form
  sksForm: FormGroup;

  SS_KEY = '';
  SS_OEM = '';
  SS_ACTIVATION_DATE = '';
  SS_EXPIRE = '';
  SS_SP_ID = '';
  SS_SC_ID = '';
  SS_ACTIVATED_BY = '';
  SS_ACTIVATION_REFERENT = '';
  SS_LAST_EDIT = '';

  constructor(private router: Router, private api: SksApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sksForm = this.formBuilder.group({
      'SS_KEY' : [null, Validators.required],
      'SS_OEM' : [null, Validators.required],
      'SS_ACTIVATION_DATE' : [null],
      'SS_EXPIRE' : [null],
      'SS_SP_ID' : [null, [Validators.required]],
      'SS_SC_ID' : [null, [Validators.required]],
      'SS_ACTIVATED_BY' : [null, Validators.required],
      'SS_ACTIVATION_REFERENT' : [null, Validators.required],
      // 'SS_LAST_EDIT' : [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postSks(form)
      .subscribe(res => {
          // const id = res['SC_ID'];
          alert(`sks key ${res['SS_KEY']} creata`);
          this.router.navigate(['/sks']);
        }, (err) => {
          console.log(err);
        });
  }

}
