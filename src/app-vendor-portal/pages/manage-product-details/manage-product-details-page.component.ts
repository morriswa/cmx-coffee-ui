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
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },]


  // services
  vendorship = inject(VendorService);
  activatedRoute = inject(ActivatedRoute);


  // component state
  productId: number;
  displayDetails: WritableSignal<any> = signal(undefined);
  productImages: WritableSignal<string[]|undefined> = signal(undefined)

  oldProductDetails: WritableSignal<any> = signal(undefined);
  stagedProductChanges: WritableSignal<any|undefined> = signal(undefined);


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
    })
    this.productNameForm.reset();
    this.showEditProductNameDialog.set(false);
  }
}
