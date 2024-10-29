import {inject, Injectable} from "@angular/core";
import {ApiClient} from "../../services/api-client.service";

@Injectable()
export class VendorService {
  api = inject(ApiClient);

  async getProducts() {
    return this.api.getProductsForVendor();
  }
}
