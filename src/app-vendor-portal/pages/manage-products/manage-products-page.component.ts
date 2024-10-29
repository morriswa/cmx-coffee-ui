import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {CurrencyPipe, NgIf} from "@angular/common";
import {VendorService} from "../../services/vendor.service";

@Component({
  selector: "app-manage-products-page",
  templateUrl: "./manage-products-page.component.html",
  standalone: true,
  imports: [
    LoaderComponent,
    NgIf,
    CurrencyPipe
  ],
})
export class ManageProductsPageComponent implements OnInit {

  // services
  vendorship = inject(VendorService);

  // state
  products: WritableSignal<any[]|undefined> = signal(undefined);


  // lifecycle
  async ngOnInit() {
    this.products.set(await this.vendorship.getProducts());
    console.log(this.products());
  }

}
