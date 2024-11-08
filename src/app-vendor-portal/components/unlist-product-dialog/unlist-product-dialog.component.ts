import {Component, inject} from "@angular/core";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {CurrencyPipe} from "@angular/common";


@Component({
  selector: "app-unlist-product-dialog",
  templateUrl: "./unlist-product-dialog.component.html",
  imports: [
    CurrencyPipe
  ],
  standalone: true
})
export class UnlistProductDialogComponent {
  ref = inject(DialogRef);
  data = inject(DIALOG_DATA);
  product = this.data.product;

  handleCancel() {
    this.ref.close({'action': 'discard'});
  }

  handleSubmit() {
    this.ref.close({'action': 'confirm'});
  }
}
