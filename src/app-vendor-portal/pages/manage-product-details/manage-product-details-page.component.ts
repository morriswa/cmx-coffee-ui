import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from "@angular/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {VendorService} from "src/app-vendor-portal/services/vendor.service";
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {LoaderComponent} from "src/components/loader/loader.component";
import {FileUploadComponent} from "src/components/file-upload/file-upload.component";
import {ImageGalleryComponent} from "src/components/image-gallery/image-gallery.component";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {ReactiveFormsModule} from "@angular/forms";
import {VendorProduct} from "src/types/vendor.type";
import {EditProductDetailsComponent} from "../../components/edit-product-details/edit-product-details.component";
import {Dialog} from "@angular/cdk/dialog";
import {DeleteImagesComponent} from "../../components/delete-images/delete-images.component";


@Component({
  selector: "app-manage-product-details-details-page",
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
    ReactiveFormsModule,
    EditProductDetailsComponent
  ],
  standalone: true
})
export class ManageProductDetailsPageComponent implements OnInit {


  // services
  dialogs = inject(Dialog);
  vendorship = inject(VendorService);
  activatedRoute = inject(ActivatedRoute);


  // component state
  productId: number = this.activatedRoute.snapshot.params['productId']
  productDetails?: VendorProduct;
  productImages: WritableSignal<any[]|undefined> = signal(undefined)
  productImageUrls: Signal<string[]> = computed(()=>{
    const images = this.productImages();
    if (!images) return [];
    return images.map(i=>i.url)
  });


  // lifecycle
  async ngOnInit() {
    this.productDetails = await this.vendorship.getProductDetails(this.productId);

    const images= await this.vendorship.getProductImages(this.productId)
    this.productImages.set(images ?? []);
  }


  // actions
  async handleChangeImage($event: File) {
    await this.vendorship.addProductImage(this.productId, $event);
    const images = await this.vendorship.getProductImages(this.productId)
    this.productImages.set(images ?? []);
  }

  async handleUpdateProductDetails($event: { changes:any, updatedProduct:any }) {
    await this.vendorship.updateProduct(this.productId, $event.changes);
    this.productDetails = $event.updatedProduct;
  }

  handleDeleteImages() {
    const ref = this.dialogs.open(DeleteImagesComponent, {
      data: { images: this.productImages() }
    });

    const sub = ref.closed.subscribe(async (res: any)=>{
      if (res?.result==='delete') {
        await this.deleteProductImage(res.imageId)
      }

      sub.unsubscribe();
    })
  }

  async deleteProductImage(imageId: string) {
    await this.vendorship.deleteProductImage(this.productId, imageId)
    this.productImages.update(images=>{
      return images?.filter(i=>i.id!==imageId)
    })
  }
}
