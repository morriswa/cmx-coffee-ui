import {Component, inject, signal, ViewChild, WritableSignal} from "@angular/core";
import {AddressFormComponent} from "../../components/address-form/address-form.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiClient} from "../../services/api-client.service";
import {VendorApplication} from "../../types/vendor.type";


@Component({
  selector: "app-vendor-application-page",
  templateUrl: "./vendor-application-page.component.html",
  styleUrl: "./vendor-application-page.component.scss",
  imports: [
    AddressFormComponent,
    ReactiveFormsModule
  ],
  standalone: true
})
export class VendorApplicationPageComponent {

  // services
  api = inject(ApiClient);

  // state
  pageState: WritableSignal<'form'|'success'|'error'> = signal('form');
  businessNameForm = new FormControl("", Validators.required);
  businessEmailForm = new FormControl("", Validators.required);
  businessPhoneForm = new FormControl("", Validators.required);


  @ViewChild("addressForm") addressForm?: AddressFormComponent;

  handleConsolePrint() {
    console.log(this.businessNameForm.value)
    console.log(this.businessEmailForm.value)
    console.log(this.businessPhoneForm.value)
    console.log(this.addressForm?.getAddress());
  }

  async handleSubmit() {
    const address = this.addressForm?.getAddress()!;
    let application: VendorApplication = {
      business_name: this.businessNameForm.value!,
      business_email: this.businessEmailForm.value!,
      phone: this.businessPhoneForm.value!,
      address_line_one: address.addressLineOne,
      address_line_two: address.addressLineTwo,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
    }

    try {
      await this.api.applyForVendorship(application)
      this.businessNameForm.reset()
      this.businessEmailForm.reset()
      this.businessPhoneForm.reset()
      this.addressForm?.reset()

      this.pageState.set('success')
    } catch {
      this.pageState.set('error')
    }
  }
}
