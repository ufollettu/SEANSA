import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { ClientiTableComponent } from './clienti/clienti-table/clienti-table.component';
import { ClientiCreateComponent } from './clienti/clienti-create/clienti-create.component';
import { ClientiEditComponent } from './clienti/clienti-edit/clienti-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SksTableComponent } from './sks/sks-table/sks-table.component';
import { SksCreateComponent } from './sks/sks-create/sks-create.component';
import { SksEditComponent } from './sks/sks-edit/sks-edit.component';


const appRoutes: Routes = [
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
    SksEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
