import {Component, inject} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {TaggedInputComponent} from "src/components/tagged-input/tagged-input.component";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent
} from "src/components/radio-button-group/radio-button-group.component";
import {FancyButtonComponent} from "src/components/fancy-button/fancy-button.component";
import {VendorService} from "../../services/vendor.service";
import {Router} from "@angular/router";


@Component({
  selector: "app-create-product-details-page",
  templateUrl: "./create-product-page.component.html",
  imports: [
    TaggedInputComponent,
    RadioButtonGroupComponent,
    FancyButtonComponent
  ],
  standalone: true
})
export class CreateProductPageComponent {

  // services
  vendorship = inject(VendorService);
  router = inject(Router);

  productNameForm = new FormControl(null, [
    Validators.required,
    Validators.maxLength(256),
    Validators.minLength(4),
  ]);
  descriptionForm = new FormControl('', [
    Validators.maxLength(256),
  ]);
  initialPriceForm = new FormControl(null, [
    Validators.required,
  ])
  tasteStrengthForm = new FormControl(null, [
    Validators.min(0), Validators.max(9)
  ])
  decafForm = new RadioButtonFormControl([
    {value: 'y', label: 'Decaf'},
    {value: 'n', label: 'Contains Caffeine'},
  ])
  flavoredForm = new RadioButtonFormControl([
    {value: 'y', label: 'Flavored'},
    {value: 'n', label: 'No Additives'},
  ])
  singleOriginForm = new RadioButtonFormControl([
    {value: 'y', label: 'Single Origin Coffee'},
    {value: 'n', label: 'Regional Blend'},
  ])

  async submitForm() {
    let product = {
      product_name: this.productNameForm.value,
      description: this.descriptionForm.value,
      initial_price: Number(this.initialPriceForm.value),
      coffee_bean_characteristics: {
        strength: this.tasteStrengthForm.value,
        decaf: this.decafForm.value,
        flavored: this.flavoredForm.value,
        single_origin: this.singleOriginForm.value,
      }
    };
    await this.vendorship.listProduct(product)
    await this.router.navigate(["/vendor","products"])
  }
}
