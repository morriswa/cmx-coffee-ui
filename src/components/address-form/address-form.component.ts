import {Component, signal} from "@angular/core";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Address} from "src/types/address.type";

@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrl: "./address-form.component.scss",
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ]
})
export class AddressFormComponent {

  // state
  protected addressLineOneForm = new FormControl("", Validators.required);
  protected addressLineTwoForm = new FormControl("");
  protected cityForm = new FormControl("", Validators.required);
  protected stateForm = signal("");
  protected zipForm = new FormControl("", Validators.required);
  protected countryForm = signal("");


  // publics
  getAddress(): Address {
    return {
      addressLineOne: this.addressLineOneForm.value ?? "",
      addressLineTwo: this.addressLineTwoForm.value ?? undefined,
      city: this.cityForm.value ?? "",
      state: this.stateForm(),
      zip: this.zipForm.value ?? "",
      country: this.countryForm()
    }
  }

  reset() {
    this.addressLineOneForm.reset();
    this.addressLineTwoForm.reset();
    this.cityForm.reset();
    this.stateForm.set("");
    this.zipForm.reset();
    this.countryForm.set("");
  }

}
