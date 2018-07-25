import { AuthGuard } from './auth.guard';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientiTableComponent } from './clienti/clienti-table/clienti-table.component';
import { ClientiCreateComponent } from './clienti/clienti-create/clienti-create.component';
import { ClientiEditComponent } from './clienti/clienti-edit/clienti-edit.component';

import { SksTableComponent } from './sks/sks-table/sks-table.component';
import { SksCreateComponent } from './sks/sks-create/sks-create.component';
import { SksEditComponent } from './sks/sks-edit/sks-edit.component';

import { RinnoviTableComponent } from './rinnovi/rinnovi-table/rinnovi-table.component';
import { RinnoviCreateComponent } from './rinnovi/rinnovi-create/rinnovi-create.component';
import { RinnoviEditComponent } from './rinnovi/rinnovi-edit/rinnovi-edit.component';

import { UtentiTableComponent } from './utenti/utenti-table/utenti-table.component';
import { UtentiCreateComponent } from './utenti/utenti-create/utenti-create.component';
// import { UtentiEditComponent } from './utenti/utenti-edit/utenti-edit.component';
import { UtentiResetpwdComponent } from './utenti/utenti-resetpwd/utenti-resetpwd.component';
import { UtentiChangelevelComponent } from './utenti/utenti-changelevel/utenti-changelevel.component';

import { PcTableComponent } from './pc/pc-table/pc-table.component';
import { PcCreateComponent } from './pc/pc-create/pc-create.component';
import { PcEditComponent } from './pc/pc-edit/pc-edit.component';

import { MatricoleTableComponent } from './matricole/matricole-table/matricole-table.component';
import { MatricoleCreateComponent } from './matricole/matricole-create/matricole-create.component';
import { MatricoleEditComponent } from './matricole/matricole-edit/matricole-edit.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const appRoutes: Routes = [

  { path: 'rinnovi', component: RinnoviTableComponent, canActivate: [AuthGuard] },
  { path: 'rinnovi-create', component: RinnoviCreateComponent, canActivate: [AuthGuard] },
  { path: 'rinnovi-edit/:id', component: RinnoviEditComponent, canActivate: [AuthGuard] },

  { path: 'utenti', component: UtentiTableComponent, canActivate: [AuthGuard]},
  { path: 'utenti-create', component: UtentiCreateComponent, canActivate: [AuthGuard] },
  // { path: 'utenti-edit/:id', component: UtentiEditComponent, canActivate: [AuthGuard] },
  { path: 'utenti-resetpwd/:id', component: UtentiResetpwdComponent, canActivate: [AuthGuard] },
  { path: 'utenti-changelevel/:id', component: UtentiChangelevelComponent, canActivate: [AuthGuard] },


  { path: 'matricole', component: MatricoleTableComponent, canActivate: [AuthGuard] },
  { path: 'matricole-create', component: MatricoleCreateComponent, canActivate: [AuthGuard] },
  { path: 'matricole-edit/:id', component: MatricoleEditComponent, canActivate: [AuthGuard] },

  { path: 'pc', component: PcTableComponent, canActivate: [AuthGuard] },
  { path: 'pc-create', component: PcCreateComponent, canActivate: [AuthGuard] },
  { path: 'pc-edit/:id', component: PcEditComponent, canActivate: [AuthGuard] },

  { path: 'sks', component: SksTableComponent, canActivate: [AuthGuard] },
  { path: 'sks-create', component: SksCreateComponent, canActivate: [AuthGuard] },
  { path: 'sks-edit/:id', component: SksEditComponent, canActivate: [AuthGuard] },

  { path: 'clienti', component: ClientiTableComponent, canActivate: [AuthGuard] },
  { path: 'clienti-create', component: ClientiCreateComponent, canActivate: [AuthGuard] },
  { path: 'clienti-edit/:id', component: ClientiEditComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },


  // { path: '', redirectTo: '/events', pathMatch: 'full' }
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
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
    // UtentiEditComponent,
    UtentiResetpwdComponent,
    UtentiChangelevelComponent,
    PcTableComponent,
    PcCreateComponent,
    PcEditComponent,
    MatricoleTableComponent,
    MatricoleCreateComponent,
    MatricoleEditComponent,
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,

  ]
})
export class AppRoutingModule {}
