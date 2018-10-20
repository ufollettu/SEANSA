import { ElementRef, Renderer2, Input, OnInit } from "@angular/core";
import { DataService } from "./../services/shared-services/data.service";
import { Directive } from "@angular/core";

@Directive({
  selector: "[appIsAdmin]"
})
export class IsAdminDirective implements OnInit {
  admin = false;

  constructor(
    private data: DataService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.getAdmin();
  }

  @Input()
  appIsAdmin: boolean;

  ngOnInit() {
    console.log(this.appIsAdmin !== this.admin);
    if (this.appIsAdmin !== this.admin) {
      console.log("hide");
      this.renderer.setStyle(this.element.nativeElement, "display", "none");
    }
  }

  getAdmin() {
    this.data.getAdminFromToken().subscribe(admin => {
      this.admin = admin;
    });
  }
}
