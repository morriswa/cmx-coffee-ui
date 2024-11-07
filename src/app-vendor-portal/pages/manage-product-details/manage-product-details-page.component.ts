import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {VendorService} from "src/app-vendor-portal/services/vendor.service";
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {LoaderComponent} from "src/components/loader/loader.component";
import {FileUploadComponent} from "src/components/file-upload/file-upload.component";
import {ImageGalleryComponent} from "src/components/image-gallery/image-gallery.component";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from "@angular/cdk/overlay";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {VendorProduct} from "src/types/vendor.type";
import {Dialog} from "@angular/cdk/dialog";
import {ProductFlagDialogComponent} from "./product-flag-dialog/product-flag-dialog.component";


@Component({
  selector: "app-manage-product-details-page",
  templateUrl: "./manage-product-details-page.component.html",
  imports: [
    NgIf,
    CurrencyPipe,
    LoaderComponent,
    NgOptimizedImage,
    FileUploadComponent,
    ImageGalleryComponent,
    CdkConnectedOverlay,
    RouterLink,
    CdkOverlayOrigin,
    ReactiveFormsModule
  ],
  standalone: true
})
export class ManageProductDetailsPageComponent implements OnInit {

  //const
  readonly popupPositions: ConnectedPosition[] = [{
    originX: 'end',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },]


  // services
  vendorship = inject(VendorService);
  activatedRoute = inject(ActivatedRoute);
  dialogs = inject(Dialog);


  // component state
  productId: number;
  displayDetails: WritableSignal<VendorProduct|undefined> = signal(undefined);
  productImages: WritableSignal<string[]|undefined> = signal(undefined)

  oldProductDetails: WritableSignal<VendorProduct|undefined> = signal(undefined);
  stagedProductChanges: WritableSignal<any> = signal(undefined);

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

  // form state
  initialPriceForm: FormControl = new FormControl();
  showEditInitialPriceDialog: WritableSignal<boolean> = signal(false);

  productDescriptionForm: FormControl = new FormControl();
  showEditDescriptionDialog: WritableSignal<boolean> = signal(false);

  productNameForm: FormControl = new FormControl();
  showEditProductNameDialog: WritableSignal<boolean> = signal(false);


  // lifecycle
  constructor() {
    this.productId = this.activatedRoute.snapshot.params['productId']
  }

  async ngOnInit() {
    await this.refreshProductDetails();
    const images = await this.vendorship.getProductImages(this.productId)
    this.productImages.set(images ?? []);
  }


  // logic
  async refreshProductDetails() {
    let productDetails = await this.vendorship.getProductDetails(this.productId);

    if (productDetails) {
      this.productNameForm.setValue(productDetails.product_name);
      this.productDescriptionForm.setValue(productDetails.description);
      this.initialPriceForm.setValue(productDetails.initial_price)

      this.displayDetails.set({...productDetails} as VendorProduct);
      this.oldProductDetails.set({...productDetails} as VendorProduct);
    }
  }

  async handleChangeImage($event: File) {
    await this.vendorship.addProductImage(this.productId, $event);
    const images = await this.vendorship.getProductImages(this.productId)
    this.productImages.set(images ?? []);
  }

  async saveChanges() {
    let changes = this.stagedProductChanges();
    if (changes) {
      if (changes['initial_price']) changes['initial_price'] = Number(changes['initial_price'])
      await this.vendorship.updateProduct(this.productId, this.stagedProductChanges());
      this.stagedProductChanges.set(undefined);
      await this.refreshProductDetails();
    }
  }

  discardChanges() {
    const oldDetails = this.oldProductDetails()
    this.displayDetails.set(oldDetails);
    this.stagedProductChanges.set(undefined);
  }

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
    this.initialPriceForm.reset();
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
    this.productDescriptionForm.reset();
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
    this.productNameForm.reset();
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
