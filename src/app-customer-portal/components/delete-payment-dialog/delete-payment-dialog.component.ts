import {Component, inject} from "@angular/core";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";


@Component({
  selector: "app-delete-payment-dialog",
  templateUrl: "./delete-payment-dialog.component.html",
  standalone: true
})
export class DeletePaymentDialogComponent {
  data = inject(DIALOG_DATA);
  ref = inject(DialogRef);

  handleCancel() {
    this.ref.close()
  }

  handleConfirm() {
    this.ref.close({
      'result': 'delete'
    })
  }
}
