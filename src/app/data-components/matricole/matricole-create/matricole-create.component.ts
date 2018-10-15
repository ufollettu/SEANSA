import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatricoleApiService } from '../../../services/api-services/matricole-api.service';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations';
import { NotificationService } from '../../../services/layout-services/notification.service';
import { AuthService } from '../../../services/auth-services/auth.service';


@Component({
  selector: 'app-matricole-create',
  templateUrl: './matricole-create.component.html',
  styleUrls: ['./matricole-create.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class MatricoleCreateComponent implements OnInit {

  sksId: any;
  matricoleForm: FormGroup;

  SM_MATRICOLA = '';
  SM_SS_ID = '';
  SM_DETTAGLI = '';
  SM_CREATION_DATE = '';
  SM_LAST_UPDATE = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private api: MatricoleApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.route.fragment
      .subscribe((fragment: string) => {
        this.sksId = fragment;
      });

    this.matricoleForm = this.formBuilder.group({
      'SM_MATRICOLA': [null, Validators.required],
      'SM_SS_ID': [this.sksId],
      'SM_DETTAGLI': [null],
      'SM_CREATION_DATE': new Date(),
      'SM_LAST_UPDATE': new Date()
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postMatricola(form)
      .subscribe(res => {
        this.notificationService.success(`matricola ${res['SM_MATRICOLA']} creata`);
        this.router.navigate(['/matricole', this.sksId]);
      }, (err) => {
        this.authService.handleLoginError(err);
      });
  }

}
