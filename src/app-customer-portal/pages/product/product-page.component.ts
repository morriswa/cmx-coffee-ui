import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiClient } from "src/services/api-client.service";
import { LoaderComponent } from "src/components/loader/loader.component";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {ImageGalleryComponent} from "src/components/image-gallery/image-gallery.component";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  standalone: true,
  imports: [LoaderComponent, NgClass, CurrencyPipe, ImageGalleryComponent, NgIf],
  host: {'class': 'flex-child'}
})
export class ProductDetailsPageComponent implements OnInit {


  activatedRoute = inject(ActivatedRoute);  // get route
  api = inject(ApiClient);  // get api client


  // get product_id from route
  productId = this.activatedRoute.snapshot.params['product_id']
  currentProduct: WritableSignal<any> = signal(undefined);
  productImages: WritableSignal<string[]> = signal([]);
  currentProductReviewStats: WritableSignal<any> = signal({average_review_score: 0, review_count: 0});

  async ngOnInit() {
    const productImages= await this.api.getProductImages(this.productId);
    this.productImages.set(productImages ?? []);

    const productDetails = await this.api.getProductDetailsForCustomer(this.productId);
    const reviewStats = await this.api.getProductReviewState(this.productId);

    this.currentProduct.set(productDetails);
    this.currentProductReviewStats.set(reviewStats);
  }

}
