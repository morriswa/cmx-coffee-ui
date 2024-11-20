import {Component, inject, OnInit} from "@angular/core";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent
} from "src/components/radio-button-group/radio-button-group.component";
import {TaggedInputComponent} from "src/components/tagged-input/tagged-input.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {VendorProduct} from "src/types/vendor.type";


@Component({
    selector: 'app-product-details-flag-dialog',
    templateUrl: './product-flag-dialog.component.html',
    styleUrl: 'product-flag-dialog.component.scss',
    imports: [
        RadioButtonGroupComponent,
        TaggedInputComponent,
        ReactiveFormsModule
    ]
})
export class ProductFlagDialogComponent implements OnInit {

  ref = inject(DialogRef);
  data: VendorProduct = inject(DIALOG_DATA);

  tasteStrengthForm: FormControl<any> = new FormControl(
    null,
    [Validators.min(1), Validators.max(10)]
  );
  decafForm: RadioButtonFormControl = new RadioButtonFormControl([
    {value: 'y', label: 'DECAF'},
    {value: 'n', label: 'Contains Caffeine'},
  ]);
  flavoredForm: RadioButtonFormControl = new RadioButtonFormControl([
    {value: 'y', label: 'Flavored'},
    {value: 'n', label: 'No Additives'},
  ]);
  singleOriginForm: RadioButtonFormControl = new RadioButtonFormControl([
    {value: 'y', label: 'Single Origin Coffee'},
    {value: 'n', label: 'Regional Blend'},
  ])

  ngOnInit() {
    this.tasteStrengthForm.setValue(Number(this.data.coffee_bean_characteristics.taste_strength ?? 0)+1)
    this.decafForm.value = this.data.coffee_bean_characteristics.decaf;
    this.flavoredForm.value = this.data.coffee_bean_characteristics.flavored;
    this.singleOriginForm.value = this.data.coffee_bean_characteristics.single_origin;
  }

  saveChanges() {
    this.ref.close({
      result: 'update',
      data: {
        taste_strength: String(Number(this.tasteStrengthForm.value) - 1),
        decaf: this.decafForm.value,
        flavored: this.flavoredForm.value,
        single_origin: this.singleOriginForm.value,
      }
    });
  }

  discardChanges() {
    this.ref.close({
      result: 'discard',
    });
  }


}
