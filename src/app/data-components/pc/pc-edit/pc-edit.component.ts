import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PcApiService } from '../pc-api.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations';


@Component({
  selector: 'app-pc-edit',
  templateUrl: './pc-edit.component.html',
  styleUrls: ['./pc-edit.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class PcEditComponent implements OnInit {

  ipAddress: any;
  pcForm: FormGroup;

  SP_ID: '';
  SP_HW_ID: '';
  SP_LAST_RX: '';
  SP_IP: '';
  SP_STATUS: '';
  SP_PC_DATE_TIME: '';

  constructor(private router: Router, private route: ActivatedRoute, private api: PcApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPc(this.route.snapshot.params['id']);
    this.pcForm = this.formBuilder.group({
      'SP_HW_ID': [null, Validators.required],
      'SP_STATUS': [null, Validators.required],
      'SP_LAST_RX': new Date(),
      'SP_IP': [null, Validators.required]
    });
  }

  getPc(id) {
    this.api.getPc(id)
      .subscribe(data => {
        this.SP_ID = data.SP_ID;
        this.pcForm.setValue({
          SP_HW_ID: data.SP_HW_ID,
          SP_STATUS: data.SP_STATUS,
          SP_LAST_RX: new Date(),
          SP_IP: data.SP_IP
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updatePc(this.SP_ID, form)
      .subscribe(res => {
        console.log(res);
        // const id = res['SC_ID'];
        alert(`pc ${res['SP_HW_ID']} aggiornato`);
        this.router.navigate(['/pc']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  pcDetails() {
    this.router.navigate(['/pc']);
  }

}
