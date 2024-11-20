import {Component, inject} from "@angular/core";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaggedInputComponent} from "src/components/tagged-input/tagged-input.component";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent
} from "src/components/radio-button-group/radio-button-group.component";
import {FancyButtonComponent} from "src/components/fancy-button/fancy-button.component";
import {VendorService} from "../../services/vendor.service";
import {Router} from "@angular/router";
import {NumberFormControl, NumberStepperComponent} from "src/components/number-stepper/number-stepper.component";
import {DecimalPipe, NgIf} from "@angular/common";


@Component({
    selector: "app-create-product-details-page",
    templateUrl: "./create-product-page.component.html",
    imports: [
        RadioButtonGroupComponent,
        FancyButtonComponent,
        NumberStepperComponent,
        ReactiveFormsModule,
        DecimalPipe,
        NgIf
    ],
    host: { class: 'flex-child' }
})
export class CreateProductPageComponent {
  ngOnInit() {
    throw new Error('Method not implemented.');
  }

  // services
  vendorship = inject(VendorService);
  router = inject(Router);

  productNameForm = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(128)
  ]);
  descriptionForm:FormControl = new FormControl('', [
    Validators.maxLength(10_000)
  ]);
  initialPriceForm:FormControl<number | null> = new FormControl(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(999.99),
  ])
  tasteStrengthForm = new NumberFormControl(1, 10);
  
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


  get formValid(): boolean {
    return (
          this.productNameForm.valid
      &&  this.descriptionForm.valid
      &&  this.initialPriceForm.valid
    )
  }

  async submitForm() {
    if (!this.formValid) {
      throw new Error('invalid product, refusing to submit')
    }

    let product = {
      product_name: this.productNameForm.value,
      description: this.descriptionForm.value,
      initial_price: Number(this.initialPriceForm.value),
      coffee_bean_characteristics: {
        taste_strength: String(Number(this.tasteStrengthForm.value) - 1),
        decaf: this.decafForm.value,
        flavored: this.flavoredForm.value,
        single_origin: this.singleOriginForm.value,
      }
    };
    await this.vendorship.listProduct(product)
    await this.router.navigate(["/vendor","products"])
  }

}
