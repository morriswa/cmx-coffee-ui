import {Component, signal} from "@angular/core";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Address} from "src/types/address.type";
import {TaggedInputComponent} from "src/components/tagged-input/tagged-input.component";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrl: "./address-form.component.scss",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TaggedInputComponent,
    NgFor
  ],
  host: { 'class': 'flex-child' }
})
export class AddressFormComponent {

  // state
  protected addressLineOneForm = new FormControl("", Validators.required);
  protected addressLineTwoForm = new FormControl("");
  protected cityForm = new FormControl("", Validators.required);
  protected stateForm = signal("");
  protected zipForm = new FormControl("", Validators.required);
  protected countryForm = signal("");

  //State values corresponding to state location
  readonly stateValue = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
    { value: "DC", label: "District of Columbia" },
    { value: "PR", label: "Puerto Rico" }
  ]


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
