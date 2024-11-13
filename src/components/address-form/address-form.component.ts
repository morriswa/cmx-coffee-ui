import {Component, inject, OnInit} from "@angular/core";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {VendorAddressForm} from "src/types/address.type";
import {TaggedInputComponent} from "src/components/tagged-input/tagged-input.component";
import {CheckboxSelectorComponent} from "../checkbox-selector/checkbox-selector.component";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent,
  RadioButtonOptions
} from "../radio-button-group/radio-button-group.component";
import {ApiClient} from "../../services/api-client.service";
import {NgIf} from "@angular/common";


@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrl: "./address-form.component.scss",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TaggedInputComponent,
    CheckboxSelectorComponent,
    NgIf,
    RadioButtonGroupComponent,
  ],
  host: { 'class': 'flex-child' }
})
export class AddressFormComponent implements OnInit{

  // services
  protected api = inject(ApiClient);

  // state
  protected addressLineOneForm = new FormControl("", Validators.required);
  protected addressLineTwoForm = new FormControl("");
  protected cityForm = new FormControl("", Validators.required);
  protected zipForm = new FormControl("", Validators.required);
  protected territoryForm?: RadioButtonFormControl;

  async ngOnInit() {
    const aux: any = await this.api.getAuxData()
    const options: RadioButtonOptions[] = (aux.territories??[]).map((t:any)=>{
      return {value:t.territory_id, label:t.display_name}
    });
    this.territoryForm = new RadioButtonFormControl(options)
  }


  // publics
  getAddress(): VendorAddressForm {
    return {
      addressLineOne: this.addressLineOneForm.value ?? "",
      addressLineTwo: this.addressLineTwoForm.value ?? undefined,
      city: this.cityForm.value ?? "",
      zip: this.zipForm.value ?? "",
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
