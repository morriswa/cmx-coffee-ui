import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiClient } from "src/services/api-client.service";
import { LoaderComponent } from "src/components/loader/loader.component";
import {CurrencyPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  standalone: true,
  imports: [LoaderComponent, NgClass, CurrencyPipe],
  host: {'class': 'flex-child'}
})
export class ProductDetailsPageComponent implements OnInit {


  activatedRoute = inject(ActivatedRoute);  // get route
  api = inject(ApiClient);  // get api client


  // get product_id from route
  productId = this.activatedRoute.snapshot.params['product_id']
  currentProduct: WritableSignal<any|undefined> = signal(undefined);
  productImages: WritableSignal<string[]|undefined> = signal(undefined);
  currentProductReviewStats: WritableSignal<any> = signal({average_review_score: 0, review_count: 0});

  async ngOnInit() {
    const productDetails = await this.api.getProductDetailsForCustomer(this.productId);
    this.currentProduct.set(productDetails);
    const reviewStats = await this.api.getProductReviewState(this.productId);
    this.currentProductReviewStats.set(reviewStats);

    this.productImages.set([
      'https://c8.alamy.com/comp/BJ78H4/coffee-beans-in-the-shape-of-a-coffee-cup-stock-photo-BJ78H4.jpg'
    ])
  }

}
