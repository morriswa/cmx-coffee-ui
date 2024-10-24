import {Component, inject} from "@angular/core";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";


@Component({
  selector: "app-vendor-applicant-action-dialog",
  templateUrl: "./vendor-applicant-action-dialog.component.html",
  standalone: true
})
export class VendorApplicantActionDialogComponent {
  ref = inject(DialogRef);
  data = inject(DIALOG_DATA);
  application = this.data.application;

  handleCancel() {
    this.ref.close({'action': 'discard'});
  }

  handleSubmit() {
    this.ref.close({'action': 'confirm'});
  }
}
