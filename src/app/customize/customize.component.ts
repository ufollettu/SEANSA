import { Component, OnInit, ViewContainerRef, HostBinding, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { slideInOutAnimation } from '../animations';
import { CustomizeApiService } from './customize-api.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomizeService } from '../services/customize.service';
import { map } from 'rxjs/operators';


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
  selectedFile: File = null;
  url = '../../assets/images/placeholder.png';
  mainColor = '';
  secondaryColor = '';
  customizeForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  SCZ_SU_ID: '';
  // SCZ_LOGO: '';
  // SCZ_LOGO_URL: '';
  SCZ_THEME: '';
  // SCZ_MAIN_COLOR: '';
  // SCZ_SECONDARY_COLOR: '';

  theme;

  constructor(
    private data: DataService,
    private router: Router,
    private http: HttpClient,
    private api: CustomizeApiService,
    private formBuilder: FormBuilder,
    // public vcRef: ViewContainerRef,
    private cpService: ColorPickerService,
    public overlayContainer: OverlayContainer,
    private customizeSevice: CustomizeService,
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.customizeSevice.currentTheme.subscribe(theme => this.theme = theme);
    this.data.getUserFromToken().subscribe(utente => {
      this.userId = utente['SU_ID'];
      this.theme = 'default-theme';
      // console.log(this.userId);
      this.setFormValues(utente['SU_ID'], this.theme);
    });
    this.customizeForm = this.formBuilder.group({
      'SCZ_SU_ID': [null],
      // 'SCZ_LOGO': [null],
      // 'SCZ_LOGO_URL': [null, Validators.required],
      'SCZ_THEME': [null],
      // 'SCZ_MAIN_COLOR': [null],
      // 'SCZ_SECONDARY_COLOR': [null]
    });
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      this.customizeForm.patchValue({ SCZ_LOGO_URL: event.target.files[0].name });

      // this.imageFileName = this.selectedFile.name;
      console.log(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (_event) => { // called once readAsDataURL is completed
        // this.customizeForm.patchValue({
        //   SCZ_LOGO: reader.result
        // });
        this.url = _event.target['result'];
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  setFormValues(userId, theme) {
    this.customizeForm.setValue({
      SCZ_SU_ID: userId,
      // SCZ_LOGO: '',
      // SCZ_LOGO_URL: '',
      SCZ_THEME: theme
      // SCZ_MAIN_COLOR: '',
      // SCZ_SECONDARY_COLOR: ''
    });
  }

  onSetTheme(theme) {
    this.customizeSevice.changeTheme(theme);
  }

  // onMainColorChange(color: any): void {
  //   this.mainColor = color;
  //   this.customizeForm.patchValue({ SCZ_MAIN_COLOR: color });
  // }

  // onSecondaryColorChange(color: any): void {
  //   this.secondaryColor = color;
  //   this.customizeForm.patchValue({ SCZ_SECONDARY_COLOR: color });
  // }

  // sendTheme(theme) {
  //   this.customizeSevice.changeTheme(theme);
  // }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.api.postCustomization(form)
      .subscribe(res => {
        alert('file uploaded');
        this.router.navigate(['/sks']);
      }, (err) => {
        console.log(err);
      });
  }
}
