import {Component, inject, OnDestroy} from "@angular/core";
import {FormControl} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {TaggedInputComponent} from "src/components/tagged-input/tagged-input.component";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent
} from "src/components/radio-button-group/radio-button-group.component";


@Component({
  selector: "app-create-mock-payment-dialog",
  templateUrl: "./create-mock-payment-dialog.component.html",
  imports: [
    TaggedInputComponent,
    RadioButtonGroupComponent
  ],
  standalone: true
})
export class CreateMockPaymentDialogComponent implements OnDestroy{

  ref = inject(DialogRef);

  nicknameForm = new FormControl()
  stateTerritoryForm: RadioButtonFormControl = new RadioButtonFormControl([
    {value: 'USA_KS', label: 'Kansas, USA'},
    {value: 'USA_MO', label: 'Missouri, USA'},
    {value: 'USA_OK', label: 'Oklahoma, USA'},
  ]);

  handleCancel() {
    this.ref.close();
  }

  handleSubmit() {
    this.ref.close({
      result: 'create',
      nickname: this.nicknameForm.value,
      territory: this.stateTerritoryForm.value
    });
  }

  ngOnDestroy(): void {
    this.nicknameForm.reset();
  }
}
