import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiClient } from "src/services/api-client.service";
import { LoaderComponent } from "src/components/loader/loader.component";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {ImageGalleryComponent} from "src/components/image-gallery/image-gallery.component";
import {NumberFormControl, NumberStepperComponent} from "src/components/number-stepper/number-stepper.component";
import {ReviewStarsComponent} from "src/components/review-stars/review-stars.component";
import {ProductReviewStats} from "../../../types/product.type";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Dialog} from "@angular/cdk/dialog";
import {
  CustomerMessageDialogComponent
} from "../../components/customer-message-dialog/customer-message-dialog.component";


@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  standalone: true,
  imports: [LoaderComponent, NgClass, CurrencyPipe, ImageGalleryComponent, NgIf, NumberStepperComponent, ReviewStarsComponent],
  host: {'class': 'flex-child'}
})
export class ProductDetailsPageComponent implements OnInit {


  activatedRoute = inject(ActivatedRoute);  // get route
  api = inject(ApiClient);  // get api client
  cart = inject(ShoppingCartService);
  dialogs = inject(Dialog);


  // get product_id from route
  productId: number = Number(this.activatedRoute.snapshot.params['product_id'])
  currentProduct: WritableSignal<any> = signal(undefined);
  productImages: WritableSignal<string[]> = signal([]);
  currentProductReviewStats: WritableSignal<ProductReviewStats> = signal({average_review_score: 0, review_count: 0});
  cartQuantityForm: NumberFormControl = new NumberFormControl(0, 99);
  disabledAction: WritableSignal<boolean> = signal(false);


  // lifecycle
  async ngOnInit() {
    const productImages= await this.api.getProductImages(this.productId);
    this.productImages.set(productImages ?? []);

    const productDetails = await this.api.getProductDetailsForCustomer(this.productId);
    const reviewStats = await this.api.getProductReviewState(this.productId);

    this.currentProduct.set(productDetails);
    this.currentProductReviewStats.set(reviewStats);

    await this.cart.refreshCart();
    const quantity = this.cart.cart()?.find(i=>i.product_id===this.productId)?.quantity ?? 0;
    this.cartQuantityForm.value = quantity;
  }

  async handleUpdateCart() {
    if (this.cartQuantityForm?.valid) {
      this.disabledAction.set(true);
      await this.cart.addToCart(this.productId, this.cartQuantityForm.value);
      this.disabledAction.set(false);
      this.dialogs.open(CustomerMessageDialogComponent, { data: {
        message: `Successfully updated quantity of ${this.currentProduct().product_name} in your shopping cart`
      }})
    }
  }
}
