import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  WritableSignal,
  input,
  InputSignal, computed
} from "@angular/core";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from "@angular/cdk/overlay";
import {CurrencyPipe} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ProductFlagDialogComponent} from "../product-flag-dialog/product-flag-dialog.component";
import {VendorProduct} from "src/types/vendor.type";
import {Dialog} from "@angular/cdk/dialog";


@Component({
    selector: "app-edit-product-details",
    templateUrl: "./edit-product-details.component.html",
    styleUrl: "./edit-product-details.component.scss",
    imports: [
        CdkConnectedOverlay,
        CdkOverlayOrigin,
        CurrencyPipe,
        ReactiveFormsModule
    ]
})
export class EditProductDetailsComponent implements OnInit{

  //const
  readonly popupPositions: ConnectedPosition[] = [{
    originX: 'end',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },]


  // component events
  @Output() saveProduct = new EventEmitter<any>();


  // services
  dialogs = inject(Dialog);


  // component state
  productDetails: InputSignal<VendorProduct> = input.required<VendorProduct>();
  updatedProductDetails: WritableSignal<VendorProduct|undefined> = signal(undefined);
  stagedProductChanges: WritableSignal<VendorProduct|undefined> = signal(undefined);


  // form state
  initialPriceForm: FormControl = new FormControl();
  showEditInitialPriceDialog: WritableSignal<boolean> = signal(false);

  productDescriptionForm: FormControl = new FormControl();
  showEditDescriptionDialog: WritableSignal<boolean> = signal(false);

  productNameForm: FormControl = new FormControl();
  showEditProductNameDialog: WritableSignal<boolean> = signal(false);


  // computed values
  // get productFlags() {
  //   const product: VendorProduct|undefined = this.updatedProductDetails();
  //   if (!product) return  [];
  //   let flags: any[] = []
  //
  //   if (product.coffee_bean_characteristics.taste_strength)
  //     flags.push(`Strength ${Number(product.coffee_bean_characteristics.taste_strength) + 1} / 10`)
  //   if (product.coffee_bean_characteristics.decaf==='y')
  //     flags.push('Decaf');
  //   else flags.push('Contains Caffeine')
  //   if (product.coffee_bean_characteristics.single_origin==='y')
  //     flags.push('Single Origin');
  //   if (product.coffee_bean_characteristics.single_origin==='n')
  //     flags.push('Blend');
  //   if (product.coffee_bean_characteristics.flavored==='y')
  //     flags.push('Flavored');
  //
  //   return flags;
  // }
  productFlags = computed(()=> {
    const product: VendorProduct|undefined = this.updatedProductDetails();
    if (!product) return  [];
    let flags: any[] = []

    if (product.coffee_bean_characteristics.taste_strength)
      flags.push(`Strength ${Number(product.coffee_bean_characteristics.taste_strength) + 1} / 10`)
    if (product.coffee_bean_characteristics.decaf==='y')
      flags.push('Decaf');
    else flags.push('Contains Caffeine')
    if (product.coffee_bean_characteristics.single_origin==='y')
      flags.push('Single Origin');
    if (product.coffee_bean_characteristics.single_origin==='n')
      flags.push('Blend');
    if (product.coffee_bean_characteristics.flavored==='y')
      flags.push('Flavored');

    return flags;
  })


  // lifecycle
  async ngOnInit() {
    await this.resetProductDetails();
  }


  // logic
  async resetProductDetails() {
    const productDetails = this.productDetails();
    this.updatedProductDetails.set(productDetails);

    this.productNameForm.setValue(productDetails.product_name);
    this.productDescriptionForm.setValue(productDetails.description);
    this.initialPriceForm.setValue(productDetails.initial_price)
  }

  async saveChanges() {
    let changes = this.stagedProductChanges();
    if (changes) {
      if (changes['initial_price']) changes['initial_price'] = Number(changes['initial_price'])

      // this.productDetails = this.displayDetails();

      const updatedProduct = this.updatedProductDetails();

      this.saveProduct.emit({
        changes:changes,
        updatedProduct: updatedProduct
      });

      this.stagedProductChanges.set(undefined);
    }
  }

  async discardChanges() {
    await this.resetProductDetails();
    this.updatedProductDetails.set(this.productDetails());
    this.stagedProductChanges.set(undefined);
  }

  // actions
  handleStageInitialPrice() {
    this.stagedProductChanges.update(d=>{
      if (!d) d = {};
      d.initial_price = Number(this.initialPriceForm.value);
      return d;
    })
    this.updatedProductDetails.update(d=>{
      const updatedDetails: VendorProduct = {...d}
      updatedDetails.initial_price = Number(this.initialPriceForm.value);
      return updatedDetails;
    });
    this.showEditInitialPriceDialog.set(false);
  }

  handleStageProductDescription() {
    this.stagedProductChanges.update(d=>{
      if (!d) d = {};
      d.description = this.productDescriptionForm.value;
      return d;
    });
    this.updatedProductDetails.update(d=>{
      const updatedDetails: VendorProduct = {...d}
      updatedDetails.product_name = this.productDescriptionForm.value;;
      return updatedDetails;
    });
    this.showEditDescriptionDialog.set(false);
  }

  handleStageProductName() {
    const productName = this.productNameForm.value;
    this.stagedProductChanges.update(d=>{
      if (!d) d = {};
      d.product_name = productName;
      return d;
    });
    this.updatedProductDetails.update(d=>{
      const updatedDetails: VendorProduct = {...d}
      updatedDetails.product_name = productName;
      return updatedDetails;
    });
    this.showEditProductNameDialog.set(false);
  }

  handleStageCoffeeBeanCharacteristics(cbc: any) {
    this.stagedProductChanges.update(d=>{
      if (!d) d = {};
      d.coffee_bean_characteristics = cbc;
      return d;
    });
    this.updatedProductDetails.update(d=>{
      const updatedDetails: VendorProduct = {...d}
      updatedDetails.coffee_bean_characteristics = cbc;
      return updatedDetails;
    });
  }

  handleCancelProductDescription() {
    this.showEditDescriptionDialog.set(false);
    this.productDescriptionForm.setValue(this.productDetails()?.description);
  }

  handleCancelInitialPrice() {
    this.showEditInitialPriceDialog.set(false);
    this.initialPriceForm.setValue(this.productDetails()?.initial_price);
  }

  handleCancelProductNameChange() {
    this.showEditProductNameDialog.set(false)
    this.productNameForm.setValue(this.productDetails()?.product_name);
  }

  handleProductFlagPopup() {
    const dialog = this.dialogs.open(ProductFlagDialogComponent, {
      data: this.updatedProductDetails(),
    });

    const sub = dialog.closed.subscribe((res: any)=>{
      if (res?.result==='update') {
        this.handleStageCoffeeBeanCharacteristics(res.data)
      }

      sub.unsubscribe();
    })
  }
}
