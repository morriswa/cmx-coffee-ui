import {Component, inject, signal, WritableSignal} from "@angular/core";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {VendorAddressForm} from "src/types/address.type";
import {TaggedInputComponent} from "src/components/tagged-input/tagged-input.component";
import {CheckboxSelectorComponent} from "../checkbox-selector/checkbox-selector.component";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent,
} from "../radio-button-group/radio-button-group.component";
import {ApiClient} from "../../services/api-client.service";
import {NgIf} from "@angular/common";


@Component({
    selector: "app-address-form",
    templateUrl: "./address-form.component.html",
    imports: [
        ReactiveFormsModule,
        NgIf,
        RadioButtonGroupComponent,
    ]
})
export class AddressFormComponent {

  // services
  protected api = inject(ApiClient);

  // state
  protected addressLineOneForm = new FormControl("", Validators.required);
  protected addressLineTwoForm = new FormControl("");
  protected cityForm = new FormControl("", Validators.required);
  protected zipForm = new FormControl("", Validators.required);
  protected territoryForm: RadioButtonFormControl = new RadioButtonFormControl([
    {value: 'USA_KS', label: 'Kansas, USA'},
    {value: 'USA_MO', label: 'Missouri, USA'},
    {value: 'USA_OK', label: 'Oklahoma, USA'},
  ]);

  get valid() {
    return (
          this.addressLineOneForm.valid
      &&  this.addressLineTwoForm.valid
      &&  this.cityForm.valid
      &&  this.zipForm.valid
      &&  this.territoryForm.valid
    )
  }

  // publics
  getAddress(): VendorAddressForm {

    if (!this.valid) {
      throw new Error('invalid product, refusing to submit');
    }

    return {
      addressLineOne: this.addressLineOneForm.value!,
      addressLineTwo: this.addressLineTwoForm.value ?? undefined,
      city: this.cityForm.value!,
      zip: this.zipForm.value!,
      territory: this.territoryForm?.value
    }
  }

  reset() {
    this.addressLineOneForm.reset();
    this.addressLineTwoForm.reset();
    this.cityForm.reset();
    this.zipForm.reset();
    this.territoryForm?.reset();
  }

}


@Component({
  selector: "app-address-form",
  template: ``,
  standalone: true,
})
export class MockAddressFormComponent {
  valid = true;
}
