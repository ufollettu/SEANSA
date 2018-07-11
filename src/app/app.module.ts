import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

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
import { UtentiEditComponent } from './utenti/utenti-edit/utenti-edit.component';

import { PcTableComponent } from './pc/pc-table/pc-table.component';
import { PcCreateComponent } from './pc/pc-create/pc-create.component';
import { PcEditComponent } from './pc/pc-edit/pc-edit.component';

import { MatricoleTableComponent } from './matricole/matricole-table/matricole-table.component';
import { MatricoleCreateComponent } from './matricole/matricole-create/matricole-create.component';
import { MatricoleEditComponent } from './matricole/matricole-edit/matricole-edit.component';


const appRoutes: Routes = [
  { path: 'rinnovi', component: RinnoviTableComponent, data: { title: 'rinnovi List' } },
  { path: 'rinnovi-create', component: RinnoviCreateComponent, data: { title: 'Create rinnovi' } },
  { path: 'rinnovi-edit/:id', component: RinnoviEditComponent, data: { title: 'Edit rinnovi' } },

  { path: 'utenti', component: UtentiTableComponent, data: { title: 'utenti List' } },
  { path: 'utenti-create', component: UtentiCreateComponent, data: { title: 'Create utenti' } },
  { path: 'utenti-edit/:id', component: UtentiEditComponent, data: { title: 'Edit utenti' } },

  { path: 'matricole', component: MatricoleTableComponent, data: { title: 'matricole List' } },
  { path: 'matricole-create', component: MatricoleCreateComponent, data: { title: 'Create matricole' } },
  { path: 'matricole-edit/:id', component: MatricoleEditComponent, data: { title: 'Edit matricole' } },

  { path: 'pc', component: PcTableComponent, data: { title: 'pc List' } },
  { path: 'pc-create', component: PcCreateComponent, data: { title: 'Create pc' } },
  { path: 'pc-edit/:id', component: PcEditComponent, data: { title: 'Edit pc' } },

  { path: 'sks', component: SksTableComponent, data: { title: 'Sks List' } },
  { path: 'sks-create', component: SksCreateComponent, data: { title: 'Create Sks' } },
  { path: 'sks-edit/:id', component: SksEditComponent, data: { title: 'Edit Sks' } },

  { path: 'clienti', component: ClientiTableComponent, data: { title: 'Customers List' } },
  { path: 'clienti-create', component: ClientiCreateComponent, data: { title: 'Create Customer' } },
  { path: 'clienti-edit/:id', component: ClientiEditComponent, data: { title: 'Edit Customer' } },

  { path: '', redirectTo: '/clienti', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
    UtentiEditComponent,
    PcTableComponent,
    PcCreateComponent,
    PcEditComponent,
    MatricoleTableComponent,
    MatricoleCreateComponent,
    MatricoleEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
