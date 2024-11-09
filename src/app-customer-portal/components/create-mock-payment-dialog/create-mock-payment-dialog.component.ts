import {Component, inject, OnDestroy} from "@angular/core";
import {FormControl} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {TaggedInputComponent} from "../../../components/tagged-input/tagged-input.component";


@Component({
  selector: "app-create-mock-payment-dialog",
  templateUrl: "./create-mock-payment-dialog.component.html",
  imports: [
    TaggedInputComponent
  ],
  standalone: true
})
export class CreateMockPaymentDialogComponent implements OnDestroy{

  ref = inject(DialogRef);

  nicknameForm = new FormControl()

  handleCancel() {
    this.ref.close();
  }

  handleSubmit() {
    this.ref.close({
      result: 'create',
      nickname: this.nicknameForm.value,
    });
  }

  ngOnDestroy(): void {
    this.nicknameForm.reset();
  }
}
