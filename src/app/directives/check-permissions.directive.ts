import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from '../services/data.service';

@Directive({
  selector: '[appCheckPermissions]'
})
export class CheckPermissionsDirective {

  permissions: number[] = [];

  constructor(
    private data: DataService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.getPerms();
  }

  @Input() set appCheckPermissions(perm: number) {
    if (this.permissions.includes(perm)) {
      // console.log('ok');
    } else {
      // console.log('non autorizzato');
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    }
  }

  getPerms() {
    this.data.getPermissionsFromToken().subscribe(permsArr => {
      this.permissions = permsArr;
    });
  }
}
