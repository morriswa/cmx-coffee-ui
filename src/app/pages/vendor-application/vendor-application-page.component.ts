import {Component, ViewChild} from "@angular/core";
import {AddressFormComponent} from "../../components/address-form/address-form.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";


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

  // state
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
}
