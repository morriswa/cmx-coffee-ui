import {inject, Injectable} from "@angular/core";
import {ApiClient} from "../../services/api-client.service";

@Injectable()
export class VendorService {
  api = inject(ApiClient);

  async getProducts() {
    return this.api.getProductsForVendor();
  }

  async getProductDetails(productId: number) {
    return this.api.getProductDetailsForVendor(productId);
  }

  async getProductImages(productId: number) {
    return this.api.getProductImages(productId);
  }
}
