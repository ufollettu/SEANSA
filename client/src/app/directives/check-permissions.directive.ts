import { Directive, ElementRef, Renderer2, Input, AfterViewInit } from '@angular/core';
import { DataService } from '../services/shared-services/data.service';

@Directive({
  selector: '[appCheckPermissions]'
})
export class CheckPermissionsDirective implements AfterViewInit {

  permissions: number[] = [];

  constructor(
    private data: DataService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    // this.getPerms();
  }

  private _perm;

  @Input() set appCheckPermissions(perm: number) {
    this._perm = perm;
    this.doPermissionCheck();
  }

  doPermissionCheck() {

    if (this.permissions.includes(this._perm)) {
      this.renderer.setStyle(this.element.nativeElement, 'display', 'inline-block');
      // console.log('ok');
    } else {
      // console.log('non autorizzato');
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    }

  }
  ngAfterViewInit() {
    this.data.getPermissionsFromToken().subscribe(permsArr => {
      this.permissions = permsArr;
      this.doPermissionCheck();
    });
  }
}
