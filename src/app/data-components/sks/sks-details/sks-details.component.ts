import { Subscription } from "rxjs";
import { DataComponentsManagementService } from "src/app/services/shared-services/data-components-management.service";
import { Router } from "@angular/router";
import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-sks-details",
  templateUrl: "./sks-details.component.html",
  styleUrls: ["./sks-details.component.css"]
})
export class SksDetailsComponent implements OnInit, OnDestroy {
  sksForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SksDetailsComponent>,
    private manager: DataComponentsManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sksForm = this.manager.sksFormInit();
    this.getSksDetails();
  }

  getSksDetails() {
    const getDetails: Subscription = this.manager.getSksDetails(
      this.data.sksId,
      this.data.pcHwId,
      this.data.customerName,
      this.data.oem,
      this.sksForm
    );
    this.manager.subscriptions.push(getDetails);
  }

  onClose() {
    this.dialogRef.close();
  }

  sendMail(sksKey) {
    this.onClose();
    this.router.navigate(["/sks-mailer", sksKey]);
  }

  ngOnDestroy() {
    this.manager.unsubAll();
  }
}
