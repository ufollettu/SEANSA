import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { slideInOutAnimation } from '../animations';
import { CustomizeApiService } from './customize-api.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CustomizeService } from '../services/customize.service';
import { UploadFileService } from './upload.service';


const URL = 'http://localhost:3000/api/customization';

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
  theme;
  enableThemeSetting = false;

  url = '../../assets/images/placeholder.png';
  customizeForm: FormGroup;

  SCZ_SU_ID: '';
  SCZ_THEME: '';

  selectedFile: File = null;
  currentFileUpload: File;

  constructor(
    private data: DataService,
    private router: Router,
    private api: CustomizeApiService,
    private uploadService: UploadFileService,
    private formBuilder: FormBuilder,
    private customizeSevice: CustomizeService,
  ) { }

  ngOnInit() {
    this.customizeSevice.currentTheme.subscribe(theme => this.theme = theme);
    this.data.getUserFromToken().subscribe(utente => {
      this.userId = utente['SU_ID'];
      this.theme = 'default-theme';
      this.setFormValues(utente['SU_ID'], this.theme);
    });
    this.customizeForm = this.formBuilder.group({
      'SCZ_SU_ID': [null],
      'SCZ_THEME': [null],
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

  setFormValues(userId, theme) {
    this.customizeForm.setValue({
      SCZ_SU_ID: userId,
      SCZ_THEME: theme
    });
  }

  onSetTheme(theme) {
    this.customizeSevice.changeTheme(theme);
  }

  upload() {
    this.uploadService.pushFileToStorage(this.selectedFile)
      .subscribe(event => {
        if (event instanceof HttpResponse) {
          alert('File is completely uploaded!');
          this.enableThemeSetting = true;
        }
      });
    this.selectedFile = undefined;
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.api.postCustomization(form)
      .subscribe(res => {
        alert('theme selected');
        this.router.navigate(['/sks']);
      }, (err) => {
        console.log(err);
      });
  }
}
