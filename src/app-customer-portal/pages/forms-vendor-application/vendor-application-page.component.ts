import {Component, inject, signal, ViewChild, WritableSignal} from "@angular/core";
import {AddressFormComponent} from "src/components/address-form/address-form.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiClient} from "src/services/api-client.service";
import {VendorApplication} from "src/types/vendor.type";
import { FancyButtonComponent } from "src/components/fancy-button/fancy-button.component";


@Component({
    selector: "app-forms-vendor-application-page",
    templateUrl: "./vendor-application-page.component.html",
    styleUrl: "./vendor-application-page.component.scss",
    imports: [
        AddressFormComponent,
        ReactiveFormsModule,
        FancyButtonComponent,
    ],
    host: { class: 'flex-child' }
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

  get valid(): boolean {
    return (
          this.businessNameForm.valid
      &&  this.businessEmailForm.valid
      &&  this.businessPhoneForm.valid
      &&  (this.addressForm?.valid ?? false)
    )
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
      zip: address.zip,
      territory: address.territory!,
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
