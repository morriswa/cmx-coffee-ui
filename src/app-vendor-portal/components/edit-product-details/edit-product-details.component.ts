import {Component, EventEmitter, inject, Input, OnInit, Output, signal, WritableSignal} from "@angular/core";
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


  // services
  dialogs = inject(Dialog);


  // component io
  @Input() productDetails!: any;
  @Output() saveProduct = new EventEmitter<any>();


  // component state
  displayDetails: WritableSignal<VendorProduct|undefined> = signal(undefined);
  oldProductDetails: WritableSignal<VendorProduct|undefined> = signal(undefined);
  stagedProductChanges: WritableSignal<any> = signal(undefined);


  // form state
  initialPriceForm: FormControl = new FormControl();
  showEditInitialPriceDialog: WritableSignal<boolean> = signal(false);

  productDescriptionForm: FormControl = new FormControl();
  showEditDescriptionDialog: WritableSignal<boolean> = signal(false);

  productNameForm: FormControl = new FormControl();
  showEditProductNameDialog: WritableSignal<boolean> = signal(false);


  // computed values
  get productFlags() {
    const product: VendorProduct|undefined = this.displayDetails();
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
  }


  // lifecycle
  async ngOnInit() {
    await this.refreshProductDetails();
  }


  // logic
  async refreshProductDetails() {
    this.productNameForm.setValue(this.productDetails.product_name);
    this.productDescriptionForm.setValue(this.productDetails.description);
    this.initialPriceForm.setValue(this.productDetails.initial_price)

    this.displayDetails.set({...this.productDetails} as VendorProduct);
    this.oldProductDetails.set({...this.productDetails} as VendorProduct);
  }

  async saveChanges() {
    let changes = this.stagedProductChanges();
    if (changes) {
      if (changes['initial_price']) changes['initial_price'] = Number(changes['initial_price'])

      this.productDetails = this.displayDetails();
      await this.refreshProductDetails();
      this.stagedProductChanges.set(undefined);

      this.saveProduct.emit({
        changes:changes,
        updatedProduct:this.productDetails,
      });
    }
  }

  async discardChanges() {
    const oldDetails = this.oldProductDetails();
    this.productDetails = oldDetails;
    await this.refreshProductDetails();
    this.displayDetails.set(oldDetails);
    this.stagedProductChanges.set(undefined);
  }

  // actions
  handleStageInitialPrice() {
    this.stagedProductChanges.update(d=>{
      if (!d) d = {};
      d['initial_price'] = Number(this.initialPriceForm.value);
      return d;
    })
    this.displayDetails.update(d=>{
      if (!d) d = {};
      d['initial_price'] = this.initialPriceForm.value;
      return d;
    })
    this.showEditInitialPriceDialog.set(false);
  }

  handleStageProductDescription() {
    this.stagedProductChanges.update(d=>{
      if (!d) d = {};
      d['description'] = this.productDescriptionForm.value;
      return d;
    });
    this.displayDetails.update(d=>{
      if (!d) d = {};
      d['description'] = this.productDescriptionForm.value;
      return d;
    })
    this.showEditDescriptionDialog.set(false);
  }

  handleStageProductName() {
    this.stagedProductChanges.update(d=>{
      if (!d) d = {};
      d['product_name'] = this.productNameForm.value;
      return d;
    });
    this.displayDetails.update(d=>{
      if (!d) d = {};
      d['product_name'] = this.productNameForm.value;
      return d;
    });
    this.showEditProductNameDialog.set(false);
  }

  handleStageCoffeeBeanCharacteristics(cbc: any) {
    this.stagedProductChanges.update(d=>{
      if (!d) d = {};
      d.coffee_bean_characteristics = cbc;
      return d;
    });
    this.displayDetails.update(d=>{
      if (!d) d = {};
      d.coffee_bean_characteristics = cbc;
      return d;
    });
  }

  handleCancelProductDescription() {
    this.showEditDescriptionDialog.set(false);
    this.productDescriptionForm.setValue(this.oldProductDetails()?.description);
  }

  handleCancelInitialPrice() {
    this.showEditInitialPriceDialog.set(false);
    this.initialPriceForm.setValue(this.oldProductDetails()?.initial_price);
  }

  handleCancelProductNameChange() {
    this.showEditProductNameDialog.set(false)
    this.productNameForm.setValue(this.oldProductDetails()?.product_name);
  }

  handleProductFlagPopup() {
    const dialog = this.dialogs.open(ProductFlagDialogComponent, {
      data: this.displayDetails(),
    });

    const sub = dialog.closed.subscribe((res: any)=>{
      if (res?.result==='update') {
        this.handleStageCoffeeBeanCharacteristics(res.data)
      }

      sub.unsubscribe();
    })
  }
}
