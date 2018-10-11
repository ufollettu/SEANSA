import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../../animations';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SksApiService } from '../../../services/api-services/sks-api.service';
import { NotificationService } from '../../../services/layout-services/notification.service';

@Component({
  selector: 'app-sks-mailer',
  templateUrl: './sks-mailer.component.html',
  styleUrls: ['./sks-mailer.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class SksMailerComponent implements OnInit {

  sksMailerForm: FormGroup;
  sks: '';
  email: '';
  message: '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: SksApiService
  ) { }

  ngOnInit() {
    this.sks = this.route.snapshot.params['id'];
    this.sksMailerForm = this.formBuilder.group({
      'sks': [this.sks, Validators.required],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'message': [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.sendEmail(form)
      .subscribe(res => {
        this.notificationService.success('mail correctly sent to ' + res[0]);
        this.router.navigate(['/sks']);
      }, (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 422) {
            this.notificationService.warn('sks does not exists');
            this.router.navigate(['/sks-mailer']);
          }
        }
      });
  }
}
