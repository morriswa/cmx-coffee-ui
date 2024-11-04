import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {Product} from "../../../types/product.type";
import {ApiClient} from "../../../services/api-client.service";
import {ProductTileComponent} from "../../components/product-tile/product-tile.component";
import {FancyButtonComponent} from "../../../components/fancy-button/fancy-button.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss',
  standalone: true,
  host: {'class': 'flex-child'},
  imports: [
    ProductTileComponent,
    FancyButtonComponent,
    RouterLink
  ],
})
export class ShopPageComponent implements OnInit {

  api = inject(ApiClient);

  products: WritableSignal<Product[]> = signal([])

  async ngOnInit() {
    const latestProducts = await this.api.getProductsForCustomer()
    if (latestProducts) this.products.set(latestProducts)
  }

    protected readonly print = print;
}
