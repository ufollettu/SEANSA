import { AuthGuard } from './guards/auth.guard';
import { PermsGuard } from './guards/perms.guard';

import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientiTableComponent } from './data-components/clienti/clienti-table/clienti-table.component';
import { ClientiCreateComponent } from './data-components/clienti/clienti-create/clienti-create.component';
import { ClientiEditComponent } from './data-components/clienti/clienti-edit/clienti-edit.component';

import { SksTableComponent } from './data-components/sks/sks-table/sks-table.component';
import { SksCreateComponent } from './data-components/sks/sks-create/sks-create.component';
import { SksEditComponent } from './data-components/sks/sks-edit/sks-edit.component';

import { RinnoviTableComponent } from './data-components/rinnovi/rinnovi-table/rinnovi-table.component';
import { RinnoviCreateComponent } from './data-components/rinnovi/rinnovi-create/rinnovi-create.component';
import { RinnoviEditComponent } from './data-components/rinnovi/rinnovi-edit/rinnovi-edit.component';

import { UtentiTableComponent } from './data-components/utenti/utenti-table/utenti-table.component';
import { UtentiCreateComponent } from './data-components/utenti/utenti-create/utenti-create.component';
import { UtentiResetpwdComponent } from './data-components/utenti/utenti-resetpwd/utenti-resetpwd.component';

import { RolesEditComponent } from './auth-components/roles/roles-edit/roles-edit.component';

import { PcTableComponent } from './data-components/pc/pc-table/pc-table.component';
import { PcCreateComponent } from './data-components/pc/pc-create/pc-create.component';
import { PcEditComponent } from './data-components/pc/pc-edit/pc-edit.component';

import { MatricoleTableComponent } from './data-components/matricole/matricole-table/matricole-table.component';
import { MatricoleCreateComponent } from './data-components/matricole/matricole-create/matricole-create.component';
import { MatricoleEditComponent } from './data-components/matricole/matricole-edit/matricole-edit.component';

import { RegisterComponent } from './auth-components/register/register.component';
import { LoginComponent } from './auth-components/login/login.component';
import { ChangePasswordComponent } from './auth-components/change-password/change-password.component';

import { ApiResolverService } from './services/api-resolver.service';
import { CheckPermissionsDirective } from './directives/check-permissions.directive';
import { CustomizeComponent } from './customize/customize.component';
import { SksRenewComponent } from './data-components/sks/sks-renew/sks-renew.component';


const appRoutes: Routes = [

  { path: 'rinnovi', component: RinnoviTableComponent, canActivate: [AuthGuard] },
  { path: 'rinnovi-create', component: RinnoviCreateComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 5 } },
  { path: 'rinnovi-edit/:id', component: RinnoviEditComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 4 } },

  { path: 'utenti', component: UtentiTableComponent, canActivate: [AuthGuard] },
  { path: 'utenti-create', component: UtentiCreateComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 0 } },
  { path: 'utenti-resetpwd/:id', component: UtentiResetpwdComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 1 } },
  // { path: 'utenti-delete/:id', component: UtentiDeleteComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 2 } },

  {
    path: 'roles-edit/:id',
    component: RolesEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      cres: ApiResolverService
    }
  },

  { path: 'matricole/:sksId', component: MatricoleTableComponent, canActivate: [AuthGuard] },
  { path: 'matricole-create', component: MatricoleCreateComponent, canActivate: [AuthGuard] },
  { path: 'matricole-edit/:id', component: MatricoleEditComponent, canActivate: [AuthGuard] },

  { path: 'pc', component: PcTableComponent, canActivate: [AuthGuard] },
  { path: 'pc-create', component: PcCreateComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 7 } },
  { path: 'pc-edit/:id', component: PcEditComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 7 } },

  { path: 'sks', component: SksTableComponent, canActivate: [AuthGuard] },
  { path: 'sks-create', component: SksCreateComponent, canActivate: [AuthGuard] },
  { path: 'sks-edit/:id', component: SksEditComponent, canActivate: [AuthGuard] },
  { path: 'sks-renew/:id', component: SksRenewComponent, canActivate: [AuthGuard] },


  { path: 'clienti', component: ClientiTableComponent, canActivate: [AuthGuard] },
  { path: 'clienti-create', component: ClientiCreateComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 6 } },
  { path: 'clienti-edit/:id', component: ClientiEditComponent, canActivate: [AuthGuard, PermsGuard], data: { expectedPerm: 6 } },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'customize', component: CustomizeComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  exports: [RouterModule],
  declarations: [
    ClientiTableComponent,
    ClientiCreateComponent,
    ClientiEditComponent,
    SksTableComponent,
    SksCreateComponent,
    SksEditComponent,
    RinnoviTableComponent,
    RinnoviCreateComponent,
    RinnoviEditComponent,
    UtentiTableComponent,
    UtentiCreateComponent,
    UtentiResetpwdComponent,
    PcTableComponent,
    PcCreateComponent,
    PcEditComponent,
    MatricoleTableComponent,
    MatricoleCreateComponent,
    MatricoleEditComponent,
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,
    RolesEditComponent,
    CheckPermissionsDirective,
    CustomizeComponent,
    SksRenewComponent
  ]
})
export class AppRoutingModule { }
