import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../animations';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CustomizeService } from '../services/customize.service';
import { UploadFileService } from './upload.service';
import { HttpResponse } from '@angular/common/http';


/** Error when invalid control is dirty, touched, or submitted. */
/** TODO copy error matcher in all components */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class CustomizeComponent implements OnInit {

  userId = '';
  theme = '';
  url = '../../assets/images/placeholder.png';
  formdata: FormData = new FormData();
  selectedFile: File = null;

  constructor(
    private data: DataService,
    private router: Router,
    private uploadService: UploadFileService,
    private customizeSevice: CustomizeService,
  ) { }

  ngOnInit() {
    this.customizeSevice.currentTheme.subscribe(theme => {
      this.theme = theme || 'default-theme';
    });
    this.data.getUserFromToken().subscribe(utente => {
      this.userId = utente['SU_ID'];
    });
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      // console.log(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.url = _event.target['result'];
      };
    }
  }

  onSetTheme(theme) {
    this.customizeSevice.changeTheme(theme);
  }

  upload() {
    this.formdata.append('logo', this.selectedFile);
    this.formdata.append('SCZ_SU_ID', this.userId);
    this.formdata.append('SCZ_THEME', this.theme);
    console.log(this.formdata);

    this.uploadService.pushFileToStorage(this.userId, this.formdata)
      .subscribe(res => {
        if (res instanceof HttpResponse) {
          alert('style and logo selected');
          console.log(res.body['SCZ_LOGO_NAME']);
          localStorage.setItem('customLogo', res.body['SCZ_LOGO_NAME']);
          localStorage.setItem('customStyle', res.body['SCZ_THEME']);
          this.router.navigate(['/sks']);
        }
      }, (err) => {
        console.log(err);
      });
  }
}
