import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckPermissionsDirective } from "./directives/check-permissions.directive";
import { IsAdminDirective } from "./directives/is-admin.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [CheckPermissionsDirective, IsAdminDirective],
  exports: [CheckPermissionsDirective, IsAdminDirective]
})
export class AppDirectivesModule {}
