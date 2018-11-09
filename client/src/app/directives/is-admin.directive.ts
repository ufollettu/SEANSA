import { ElementRef, Renderer2, Input, AfterViewInit } from "@angular/core";
import { DataService } from "./../services/shared-services/data.service";
import { Directive } from "@angular/core";

@Directive({
  selector: "[appIsAdmin]"
})
export class IsAdminDirective implements AfterViewInit {
  admin = false;

  constructor(
    private data: DataService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  @Input()
  appIsAdmin: boolean;

  ngAfterViewInit() {
    if (!this.data.getAdminFromTokenBool()) {
      console.log("hide");

      this.renderer.setStyle(this.element.nativeElement, "display", "none");
    }
  }
}
