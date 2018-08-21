import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RinnoviApiService } from '../rinnovi-api.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations';


@Component({
  selector: 'app-rinnovi-create',
  templateUrl: './rinnovi-create.component.html',
  styleUrls: ['./rinnovi-create.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class RinnoviCreateComponent implements OnInit {

  rinnoviForm: FormGroup;

  SR_SS_ID = '';
  SR_TS = '';

  constructor(private router: Router, private api: RinnoviApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.rinnoviForm = this.formBuilder.group({
      'SR_SS_ID': [null, Validators.required],
      'SR_TS': new Date()
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postRinnovo(form)
      .subscribe(res => {
        alert(`rinnovo creato`);
        this.router.navigate(['/rinnovi']);
      }, (err) => {
        console.log(err);
      });
  }
}
