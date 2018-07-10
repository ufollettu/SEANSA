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
// import { ClientiComponent } from './clienti/clienti.component';
// import { ClientiDetailComponent } from './clienti-detail/clienti-detail.component';
import { ClientiTableComponent } from './clienti-table/clienti-table.component';
import { ClientiCreateComponent } from './clienti-create/clienti-create.component';
import { ClientiEditComponent } from './clienti-edit/clienti-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const appRoutes: Routes = [
  { path: 'clienti', component: ClientiTableComponent, data: { title: 'Customers List' } },
  // { path: 'clienti-details/:id', component: ClientiDetailComponent, data: { title: 'Customer Details' } },
  { path: 'clienti-create', component: ClientiCreateComponent, data: { title: 'Create Customer' } },
  { path: 'clienti-edit/:id', component: ClientiEditComponent, data: { title: 'Edit Customer' } },
  { path: '', redirectTo: '/clienti', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    // ClientiComponent,
    // ClientiDetailComponent,
    ClientiCreateComponent,
    ClientiEditComponent,
    HeaderComponent,
    FooterComponent,
    ClientiTableComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
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
