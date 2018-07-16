import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
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

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';

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
    MatricoleEditComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
