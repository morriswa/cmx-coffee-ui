import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {VendorService} from "../../services/vendor.service";
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {FileUploadComponent} from "../../../components/file-upload/file-upload.component";


@Component({
  selector: "app-manage-product-details-page",
  templateUrl: "./manage-product-details-page.component.html",
  imports: [
    NgIf,
    CurrencyPipe,
    LoaderComponent,
    NgOptimizedImage,
    FileUploadComponent
  ],
  standalone: true
})
export class ManageProductDetailsPageComponent implements OnInit {

  // services
  vendorship = inject(VendorService);
  activatedRoute = inject(ActivatedRoute);


  // state
  productId: number;
  productDetails: WritableSignal<any> = signal(undefined);
  productImages: WritableSignal<string[]> = signal([])

  // lifecycle
  constructor() {
    this.productId = this.activatedRoute.snapshot.params['productId']
  }

  async ngOnInit() {
    this.productDetails.set(await this.vendorship.getProductDetails(this.productId));
    const images = await this.vendorship.getProductImages(this.productId)
    this.productImages.set(images ?? []);
  }

  async handleChangeImage($event: File) {
    await this.vendorship.addProductImage(this.productId, $event);
    const images = await this.vendorship.getProductImages(this.productId)
    this.productImages.set(images ?? []);
  }
}
