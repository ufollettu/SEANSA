import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appCheckPermissions]'
})
export class CheckPermissionsDirective {

  // in template --> [appCheckPermissions]="{querySelector:'.example-element-name'}"


  // @HostBinding('class.example-element-diagram-blue') private ishovering: boolean;

  // @Input('appCheckPermissions') config = {
  //   querySelector: '.example-element-details'
  // };

  // constructor(private element: ElementRef, private renderer: Renderer2) {
  //   // renderer.setStyle(element.nativeElement, 'backgroundColor', 'lightgray');
  // }

  // @HostListener('mouseover') onMouseOver() {
  //   const part = this.element.nativeElement.querySelector(this.config.querySelector);
  //   this.renderer.setStyle(part, 'display', 'block');
  //   this.ishovering = true;
  // }

  // @HostListener('mouseout') onMouseOut() {
  //   const part = this.element.nativeElement.querySelector(this.config.querySelector);
  //   this.renderer.setStyle(part, 'display', 'none');
  //   this.ishovering = false;
  // }
}
