import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {LoaderComponent} from "src/components/loader/loader.component";
import {CurrencyPipe, NgIf} from "@angular/common";
import {VendorService} from "src/app-vendor-portal/services/vendor.service";
import {RouterLink} from "@angular/router";
import {Dialog} from "@angular/cdk/dialog";
import {UnlistProductDialogComponent} from "./unlist-product-dialog/unlist-product-dialog.component";


@Component({
  selector: "app-manage-products-page",
  templateUrl: "./manage-products-page.component.html",
  standalone: true,
  imports: [
    LoaderComponent,
    NgIf,
    CurrencyPipe,
    RouterLink
  ],
})
export class ManageProductsPageComponent implements OnInit {

  // services
  dialogs = inject(Dialog);
  vendorship = inject(VendorService);

  // state
  products: WritableSignal<any[]|undefined> = signal(undefined);


  // lifecycle
  async ngOnInit() {
    this.products.set(await this.vendorship.getProducts());
    console.log(this.products());
  }


  // logic
  handleUnlistPopup(product: any) {
    const ref = this.dialogs.open(UnlistProductDialogComponent, {
      data: { product: product }
    });

    const ref$ = ref.closed.subscribe(async (result: any)=>{
      if (result?.action==='confirm') {
        await this.unlistProduct(product.product_id);
      }

      ref$.unsubscribe();
    });
  }

  async unlistProduct(product_id: number) {
    await this.vendorship.unlistProduct(product_id);
    this.products.update(products=>{
      if (products)
        return products.filter(product=>product.product_id!==product_id);
      else
        return products;
    });
  }
}
