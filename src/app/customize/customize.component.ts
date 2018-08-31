import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { slideInOutAnimation } from '../animations';
import { CustomizeApiService } from './customize-api.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

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
  selectedFile: File = null;
  url = '../../assets/images/placeholder.png';
  mainColor = '';
  secondaryColor = '';
  customizeForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  SCZ_SU_ID: '';
  SCZ_LOGO_URL: '';
  SCZ_MAIN_COLOR: '';
  SCZ_SECONDARY_COLOR: '';


  constructor(
    private data: DataService,
    private router: Router,
    private http: HttpClient,
    private api: CustomizeApiService,
    private formBuilder: FormBuilder,
    // public vcRef: ViewContainerRef,
    private cpService: ColorPickerService
  ) { }

  ngOnInit() {
    this.data.getUserFromToken().subscribe(utente => {
      this.userId = utente['SU_ID'];
      console.log(this.userId);
      this.setFormValues(utente['SU_ID']);
    });
    this.customizeForm = this.formBuilder.group({
      'SCZ_SU_ID': [null],
      'SCZ_LOGO_URL': [null],
      'SCZ_MAIN_COLOR': [null],
      'SCZ_SECONDARY_COLOR': [null]
    });
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    this.customizeForm.patchValue({ SCZ_LOGO_URL: event.target.files[0].name });

      // this.imageFileName = this.selectedFile.name;
      // console.log(this.selectedFile.name);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (_event) => { // called once readAsDataURL is completed
        this.url = _event.target['result'];
      };
    }
  }

  setFormValues(userId) {
    this.customizeForm.setValue({
      SCZ_SU_ID: userId,
      SCZ_LOGO_URL: '',
      SCZ_MAIN_COLOR: '',
      SCZ_SECONDARY_COLOR: ''
    });
  }

  onMainColorChange(color: any): void {
    this.mainColor = color;
    this.customizeForm.patchValue({ SCZ_MAIN_COLOR: color });
  }

  onSecondaryColorChange(color: any): void {
    this.secondaryColor = color;
    this.customizeForm.patchValue({ SCZ_SECONDARY_COLOR: color });
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    // this.api.postCustomization(form)
    //   .subscribe(res => {
    //     alert('file uploaded');
    //     this.router.navigate(['/sks']);
    //   }, (err) => {
    //     console.log(err);
    //   });
  }
}
