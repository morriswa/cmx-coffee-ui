import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {Product} from "../../../types/product.type";
import {ApiClient} from "../../../services/api-client.service";
import {ProductTileComponent} from "../../components/product-tile/product-tile.component";
import {FancyButtonComponent} from "../../../components/fancy-button/fancy-button.component";
import {RouterLink} from "@angular/router";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Dialog} from "@angular/cdk/dialog";
import {
  CustomerMessageDialogComponent
} from "../../components/customer-message-dialog/customer-message-dialog.component";

@Component({
  selector: 'app-browse-products',
  templateUrl: './browse-products-page.component.html',
  styleUrl: './browse-products-page.component.scss',
  standalone: true,
  host: {'class': 'flex-col align-items-center'},
  imports: [
    ProductTileComponent,
    FancyButtonComponent,
    RouterLink
  ],
})
export class BrowseProductsPageComponent implements OnInit {

  api = inject(ApiClient);
  shoppingCart = inject(ShoppingCartService);
  dialogs = inject(Dialog);

  products: WritableSignal<Product[]> = signal([])
  disabledButtons: WritableSignal<Map<number, boolean>> = signal(new Map());

  async ngOnInit() {
    const latestProducts = await this.api.getProductsForCustomer()
    if (latestProducts) this.products.set(latestProducts)
  }

  disabledActions(productId: number) {
    return this.disabledButtons().get(productId) ?? false;
  }

  async handleAddToCart(product: Product) {
    this.disabledButtons.update(v=>{
      v.set(product.product_id, true);
      return v;
    });
    await this.shoppingCart.addToCart(product.product_id, 1);
    this.disabledButtons.update(v=>{
      v.set(product.product_id, false);
      return v;
    });

    this.dialogs.open(CustomerMessageDialogComponent,
      { data: { message: `Successfully added 1x ${product.product_name} to your shopping cart` }}
    )
  }
}
