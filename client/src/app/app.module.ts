import { AppDirectivesModule } from "./app-directives.module";
import { TokenInterceptorService } from "./services/interceptor-services/token-interceptor.service";
import { CheckPermissionsDirective } from "./directives/check-permissions.directive";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppMaterialModule } from "./app-material.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout-components/header/header.component";
import { FooterComponent } from "./layout-components/footer/footer.component";
import { ProgressSpinnerComponent } from "./layout-components/progress-spinner/progress-spinner.component";
import { MAT_DATE_LOCALE } from "@angular/material";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { ConfirmDialogComponent } from "./layout-components/confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProgressSpinnerComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppDirectivesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: "it-IT" },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
