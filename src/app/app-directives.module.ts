import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckPermissionsDirective } from "./directives/check-permissions.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [CheckPermissionsDirective],
  exports: [CheckPermissionsDirective]
})
export class AppDirectivesModule {}
