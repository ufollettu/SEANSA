import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PcApiService } from '../pc-api.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pc-create',
  templateUrl: './pc-create.component.html',
  styleUrls: ['./pc-create.component.css']
})
export class PcCreateComponent implements OnInit {

  ipAddress: any;
  pcForm: FormGroup;

  SP_HW_ID: '';
  SP_LAST_RX: '';
  SP_IP: '';
  SP_STATUS: '';
  SP_PC_DATE_TIME: '';

  constructor(private router: Router, private api: PcApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pcForm = this.formBuilder.group({
      'SP_HW_ID': [null, Validators.required],
      'SP_LAST_RX': new Date(),
      'SP_IP': [this.getIp(), Validators.required],
      'SP_STATUS': [null, Validators.required],
      'SP_PC_DATE_TIME': new Date()
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postPc(form)
      .subscribe(res => {
          // const id = res['SC_ID'];
          alert(`pc ${res['SP_HW_ID']} creato`);
          this.router.navigate(['/pc']);
        }, (err) => {
          console.log(err);
        });
  }

  getIp() {
    this.api.getIpAddress()
    .subscribe(data => {
      console.log('ip', data.ip);
      return this.ipAddress = data.ip;
    });
  }

}