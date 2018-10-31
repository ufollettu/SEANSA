import { AppDirectivesModule } from "./app-directives.module";
import { CheckPackResolverService } from "./services/resolver-services/check-pack-resolver.service";
import { ApiResolverService } from "./services/resolver-services/api-resolver.service";

import { AuthGuard } from "./guards/auth.guard";
import { PermsGuard } from "./guards/perms.guard";
import { IsAdminGuard } from "./guards/is-admin.guard";

import { AppMaterialModule } from "./app-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColorPickerModule } from "ngx-color-picker";

import { ClientiTableComponent } from "./data-components/clienti/clienti-table/clienti-table.component";
import { ClientiCreateComponent } from "./data-components/clienti/clienti-create/clienti-create.component";
import { ClientiEditComponent } from "./data-components/clienti/clienti-edit/clienti-edit.component";

import { SksTableComponent } from "./data-components/sks/sks-table/sks-table.component";
import { SksDetailsComponent } from "./data-components/sks/sks-details/sks-details.component";
import { SksCreateComponent } from "./data-components/sks/sks-create/sks-create.component";
import { SksEditComponent } from "./data-components/sks/sks-edit/sks-edit.component";
import { SksRenewComponent } from "./data-components/sks/sks-renew/sks-renew.component";
import { SksMailerComponent } from "./data-components/sks/sks-mailer/sks-mailer.component";

import { RinnoviTableComponent } from "./data-components/rinnovi/rinnovi-table/rinnovi-table.component";

import { UtentiTableComponent } from "./data-components/utenti/utenti-table/utenti-table.component";
import { UtentiCreateComponent } from "./data-components/utenti/utenti-create/utenti-create.component";
import { UtentiResetpwdComponent } from "./data-components/utenti/utenti-resetpwd/utenti-resetpwd.component";

import { RolesEditComponent } from "./auth-components/roles/roles-edit/roles-edit.component";

import { PcTableComponent } from "./data-components/pc/pc-table/pc-table.component";

import { MatricoleTableComponent } from "./data-components/matricole/matricole-table/matricole-table.component";
import { MatricoleCreateComponent } from "./data-components/matricole/matricole-create/matricole-create.component";
import { MatricoleCloneComponent } from "./data-components/matricole/matricole-clone/matricole-clone.component";

import { PacksTableComponent } from "./data-components/packs/packs-table/packs-table.component";
import { PacksCreateComponent } from "./data-components/packs/packs-create/packs-create.component";
import { PacksEditComponent } from "./data-components/packs/packs-edit/packs-edit.component";

import { RegisterComponent } from "./auth-components/register/register.component";
import { LoginComponent } from "./auth-components/login/login.component";
import { ChangePasswordComponent } from "./auth-components/change-password/change-password.component";
import { ForgotPwdComponent } from "./auth-components/forgot-pwd/forgot-pwd.component";

import { CustomizeComponent } from "./customize/customize.component";

import { LoadingTableSpinnerComponent } from "./layout-components/loading-table-spinner/loading-table-spinner.component";
// import { ConfirmDialogComponent } from "./layout-components/confirm-dialog/confirm-dialog.component";
import { SearchBarComponent } from "./layout-components/search-bar/search-bar.component";
import { CustomizeUserComponent } from "./customize/customize-user/customize-user.component";
import { PacksHistoryTableComponent } from "./data-components/packs-history/packs-history-table/packs-history-table.component";
import { UtentiEditComponent } from "./data-components/utenti/utenti-edit/utenti-edit.component";

const appRoutes: Routes = [
  {
    path: "rinnovi",
    component: RinnoviTableComponent,
    canActivate: [AuthGuard]
  },

  { path: "utenti", component: UtentiTableComponent, canActivate: [AuthGuard] },
  {
    path: "utenti-create",
    component: UtentiCreateComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 0 }
  },
  {
    path: "utenti-resetpwd/:id",
    component: UtentiResetpwdComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 1 }
  },

  {
    path: "roles-edit/:id",
    component: RolesEditComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 4 },
    resolve: { cres: ApiResolverService }
  },

  {
    path: "matricole/:sksId",
    component: MatricoleTableComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 8 }
  },
  {
    path: "matricole-create",
    component: MatricoleCreateComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 8 }
  },
  {
    path: "matricole-clone",
    component: MatricoleCloneComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 8 }
  },

  { path: "pc", component: PcTableComponent, canActivate: [AuthGuard] },

  { path: "sks", component: SksTableComponent, canActivate: [AuthGuard] },
  {
    path: "sks-create",
    component: SksCreateComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 5 },
    resolve: { checkPack: CheckPackResolverService }
  },
  {
    path: "sks-mailer/:id",
    component: SksMailerComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 5 }
  },
  {
    path: "sks-edit/:id",
    component: SksEditComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 5 }
  },
  {
    path: "sks-renew/:id",
    component: SksRenewComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 4 }
  },

  {
    path: "packs",
    component: PacksTableComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 9 }
  },
  {
    path: "packs-create",
    component: PacksCreateComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 9 }
  },
  {
    path: "packs-edit/:id",
    component: PacksEditComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 9 }
  },

  {
    path: "packs-history",
    component: PacksHistoryTableComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 9 }
  },

  {
    path: "clienti",
    component: ClientiTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "clienti-create",
    component: ClientiCreateComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 6 }
  },
  {
    path: "clienti-edit/:id",
    component: ClientiEditComponent,
    canActivate: [AuthGuard, PermsGuard],
    data: { expectedPerm: 6 }
  },

  { path: "login", component: LoginComponent },
  { path: "forgot-pwd", component: ForgotPwdComponent },
  // { path: 'register', component: RegisterComponent },
  {
    path: "changepassword",
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customize",
    component: CustomizeComponent,
    canActivate: [AuthGuard, IsAdminGuard]
  },
  {
    path: "customize/:id",
    component: CustomizeUserComponent,
    canActivate: [AuthGuard, IsAdminGuard]
  },

  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ColorPickerModule,
    AppDirectivesModule
  ],
  exports: [RouterModule],
  declarations: [
    LoadingTableSpinnerComponent,
    ClientiTableComponent,
    ClientiCreateComponent,
    ClientiEditComponent,
    SksTableComponent,
    SksDetailsComponent,
    SksCreateComponent,
    SksEditComponent,
    SksRenewComponent,
    SksMailerComponent,
    RinnoviTableComponent,
    UtentiTableComponent,
    UtentiCreateComponent,
    UtentiEditComponent,
    UtentiResetpwdComponent,
    PcTableComponent,
    MatricoleTableComponent,
    MatricoleCreateComponent,
    MatricoleCloneComponent,
    PacksTableComponent,
    PacksCreateComponent,
    PacksEditComponent,
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,
    RolesEditComponent,
    ForgotPwdComponent,
    CustomizeComponent,
    SearchBarComponent,
    CustomizeUserComponent,
    PacksHistoryTableComponent
    // CheckPermissionsDirective
  ],
  entryComponents: [SksDetailsComponent]
})
export class AppRoutingModule {}
