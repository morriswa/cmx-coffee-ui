import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {VendorService} from "../../services/vendor.service";
import {CurrencyPipe, NgIf} from "@angular/common";
import {LoaderComponent} from "../../../components/loader/loader.component";


@Component({
  selector: "app-vendor-manage-product-details-page",
  templateUrl: "./vendor-manage-product-details-page.component.html",
  imports: [
    NgIf,
    CurrencyPipe,
    LoaderComponent
  ],
  standalone: true
})
export class VendorManageProductDetailsPageComponent implements OnInit {

  // services
  vendorship = inject(VendorService);
  activatedRoute = inject(ActivatedRoute);


  // state
  productId: number;
  productDetails: WritableSignal<any> = signal(undefined);


  // lifecycle
  constructor() {
    this.productId = this.activatedRoute.snapshot.params['productId']
  }

  async ngOnInit() {
    this.productDetails.set(await this.vendorship.getProductDetails(this.productId));
  }


}
