import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {Product} from "../../../types/product.type";
import {ApiClient} from "../../../services/api-client.service";
import {ProductTileComponent} from "../../components/product-tile/product-tile.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss',
  imports: [
    ProductTileComponent
  ],
  standalone: true
})
export class ShopPageComponent implements OnInit {

  api = inject(ApiClient);

  products: WritableSignal<Product[]> = signal([])

  async ngOnInit() {
    const latestProducts = await this.api.getProductsForCustomer()
    if (latestProducts) this.products.set(latestProducts)
  }

}
