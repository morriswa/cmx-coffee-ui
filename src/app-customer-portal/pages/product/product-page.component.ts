import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiClient } from "src/services/api-client.service";
import { LoaderComponent } from "../../../components/loader/loader.component";
import { CommonModule, NgClass } from "@angular/common";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  standalone: true,
  imports: [LoaderComponent, NgClass],
  host: {'class': 'flex-child'}
})
export class ProductDetailsPageComponent implements OnInit {

  // get route
  activatedRoute = inject(ActivatedRoute);
  // get api client
  api = inject(ApiClient);

  // get product_id from route
  productId = this.activatedRoute.snapshot.params['product_id']
  currentProduct: WritableSignal<any|undefined> = signal(undefined);
  productImages: WritableSignal<string[]|undefined> = signal(undefined);

  async ngOnInit() {
    // const productDetails = await this.api.getProductDetailsForCustomer(this.productId);
    // this.currentProduct.set(productDetails);
    this.currentProduct.set({
      product_id: 1,
      product_name: 'Maps Coffee',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      tax_adjusted_price: 22,
      decaf: 'y',
      single_origin: 'y',
      flavor: 'no flavor',
      product_weight: 20,
      grind_settings: 'whole bean',
      review: 4
    });

    this.productImages.set([
      'https://c8.alamy.com/comp/BJ78H4/coffee-beans-in-the-shape-of-a-coffee-cup-stock-photo-BJ78H4.jpg'
    ])
  }


}
