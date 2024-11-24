import {Component, inject, OnInit} from "@angular/core";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";


@Component({
  selector: "app-customer-message-dialog",
  templateUrl: "./customer-message-dialog.component.html",
  standalone: true
})
export class CustomerMessageDialogComponent implements OnInit {

  ref = inject(DialogRef);
  data = inject(DIALOG_DATA);

  ngOnInit(): void {
    if (!this.data.message) throw new Error("message is required")

    const timeout = this.data.timeout ?? 7000;

    setTimeout(() => {
      this.ref.close()
    }, timeout)
  }

  handleClose() {
    this.ref.close();
  }
}
